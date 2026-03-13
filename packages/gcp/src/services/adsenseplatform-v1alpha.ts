// ==========================================================================
// AdSense Platform API (adsenseplatform v1alpha)
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
  name: "adsenseplatform",
  version: "v1alpha",
  rootUrl: "https://adsenseplatform.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface PlatformChildSite {
  /** Identifier. Format: accounts/{account}/platforms/{platform}/childAccounts/{child_account}/sites/{platform_child_site} */
  name?: string;
  /** Output only. Domain URL of the Platform Child Site. Part of the PlatformChildSite name. */
  domain?: string;
  /** Resource name of the Platform Group of the Platform Child Site. */
  platformGroup?: string;
}

export const PlatformChildSite: Schema.Schema<PlatformChildSite> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      domain: Schema.optional(Schema.String),
      platformGroup: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlatformChildSite",
  }) as any as Schema.Schema<PlatformChildSite>;

export interface ListPlatformChildSitesResponse {
  /** Continuation token used to page through platforms. To retrieve the next page of the results, set the next request's "page_token" value to this. */
  nextPageToken?: string;
  /** The platform child sites returned in this list response. */
  platformChildSites?: Array<PlatformChildSite>;
}

export const ListPlatformChildSitesResponse: Schema.Schema<ListPlatformChildSitesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      platformChildSites: Schema.optional(Schema.Array(PlatformChildSite)),
    }),
  ).annotate({
    identifier: "ListPlatformChildSitesResponse",
  }) as any as Schema.Schema<ListPlatformChildSitesResponse>;

export interface Site {
  /** Output only. Resource name of a site. Format: platforms/{platform}/accounts/{account}/sites/{site} */
  name?: string;
  /** Domain/sub-domain of the site. Must be a valid domain complying with [RFC 1035](https://www.ietf.org/rfc/rfc1035.txt) and formatted as punycode [RFC 3492](https://www.ietf.org/rfc/rfc3492.txt) in case the domain contains unicode characters. */
  domain?: string;
  /** Output only. State of a site. */
  state?:
    | "STATE_UNSPECIFIED"
    | "REQUIRES_REVIEW"
    | "GETTING_READY"
    | "READY"
    | "NEEDS_ATTENTION"
    | (string & {});
}

export const Site: Schema.Schema<Site> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      domain: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Site" }) as any as Schema.Schema<Site>;

export interface ListSitesResponse {
  /** Continuation token used to page through sites. To retrieve the next page of the results, set the next request's "page_token" value to this. */
  nextPageToken?: string;
  /** The sites returned in this list response. */
  sites?: Array<Site>;
}

export const ListSitesResponse: Schema.Schema<ListSitesResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      sites: Schema.optional(Schema.Array(Site)),
    }),
  ).annotate({
    identifier: "ListSitesResponse",
  }) as any as Schema.Schema<ListSitesResponse>;

export interface LookupAccountResponse {
  /** The name of the Account Format: platforms/{platform}/accounts/{account_id} */
  name?: string;
}

export const LookupAccountResponse: Schema.Schema<LookupAccountResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LookupAccountResponse",
  }) as any as Schema.Schema<LookupAccountResponse>;

export interface Platform {
  /** Default platform group for the platform. */
  defaultPlatformGroup?: string;
  /** Identifier. Resource name of a platform. Format: accounts/{account}/platforms/{platform} */
  name?: string;
  /** Output only. Description of the platform. */
  description?: string;
}

export const Platform: Schema.Schema<Platform> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      defaultPlatformGroup: Schema.optional(Schema.String),
      name: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Platform" }) as any as Schema.Schema<Platform>;

export interface ListPlatformsResponse {
  /** Continuation token used to page through platforms. To retrieve the next page of the results, set the next request's "page_token" value to this. */
  nextPageToken?: string;
  /** The platforms returned in this list response. */
  platforms?: Array<Platform>;
}

export const ListPlatformsResponse: Schema.Schema<ListPlatformsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      platforms: Schema.optional(Schema.Array(Platform)),
    }),
  ).annotate({
    identifier: "ListPlatformsResponse",
  }) as any as Schema.Schema<ListPlatformsResponse>;

export interface TimeZone {
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  id?: string;
  /** Optional. IANA Time Zone Database version number. For example "2019a". */
  version?: string;
}

export const TimeZone: Schema.Schema<TimeZone> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      id: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "TimeZone" }) as any as Schema.Schema<TimeZone>;

export interface Account {
  /** Output only. Resource name of the account. Format: platforms/pub-[0-9]+/accounts/pub-[0-9]+ */
  name?: string;
  /** Output only. Approval state of the account. */
  state?:
    | "STATE_UNSPECIFIED"
    | "UNCHECKED"
    | "APPROVED"
    | "DISAPPROVED"
    | (string & {});
  /** Required. The IANA TZ timezone code of this account. For more information, see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones. This field is used for reporting. It is recommended to set it to the same value for all child accounts. */
  timeZone?: TimeZone;
  /** Display name of this account. */
  displayName?: string;
  /** Output only. Creation time of the account. */
  createTime?: string;
  /** Required. Input only. CLDR region code of the country/region of the address. Set this to country code of the child account if known, otherwise to your own country code. */
  regionCode?: string;
  /** Required. An opaque token that uniquely identifies the account among all the platform's accounts. This string may contain at most 64 non-whitespace ASCII characters, but otherwise has no predefined structure. However, it is expected to be a platform-specific identifier for the user creating the account, so that only a single account can be created for any given user. This field must not contain any information that is recognizable as personally identifiable information. e.g. it should not be an email address or login name. Once an account has been created, a second attempt to create an account using the same creation_request_id will result in an ALREADY_EXISTS error. */
  creationRequestId?: string;
}

export const Account: Schema.Schema<Account> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      timeZone: Schema.optional(TimeZone),
      displayName: Schema.optional(Schema.String),
      createTime: Schema.optional(Schema.String),
      regionCode: Schema.optional(Schema.String),
      creationRequestId: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Account" }) as any as Schema.Schema<Account>;

export interface CloseAccountResponse {}

export const CloseAccountResponse: Schema.Schema<CloseAccountResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CloseAccountResponse",
  }) as any as Schema.Schema<CloseAccountResponse>;

export interface Decimal {
  /** The decimal value, as a string. The string representation consists of an optional sign, `+` (`U+002B`) or `-` (`U+002D`), followed by a sequence of zero or more decimal digits ("the integer"), optionally followed by a fraction, optionally followed by an exponent. An empty string **should** be interpreted as `0`. The fraction consists of a decimal point followed by zero or more decimal digits. The string must contain at least one digit in either the integer or the fraction. The number formed by the sign, the integer and the fraction is referred to as the significand. The exponent consists of the character `e` (`U+0065`) or `E` (`U+0045`) followed by one or more decimal digits. Services **should** normalize decimal values before storing them by: - Removing an explicitly-provided `+` sign (`+2.5` -> `2.5`). - Replacing a zero-length integer value with `0` (`.5` -> `0.5`). - Coercing the exponent character to upper-case, with explicit sign (`2.5e8` -> `2.5E+8`). - Removing an explicitly-provided zero exponent (`2.5E0` -> `2.5`). Services **may** perform additional normalization based on its own needs and the internal decimal implementation selected, such as shifting the decimal point and exponent value together (example: `2.5E-1` <-> `0.25`). Additionally, services **may** preserve trailing zeroes in the fraction to indicate increased precision, but are not required to do so. Note that only the `.` character is supported to divide the integer and the fraction; `,` **should not** be supported regardless of locale. Additionally, thousand separators **should not** be supported. If a service does support them, values **must** be normalized. The ENBF grammar is: DecimalString = '' | [Sign] Significand [Exponent]; Sign = '+' | '-'; Significand = Digits '.' | [Digits] '.' Digits; Exponent = ('e' | 'E') [Sign] Digits; Digits = { '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' }; Services **should** clearly document the range of supported values, the maximum supported precision (total number of digits), and, if applicable, the scale (number of digits after the decimal point), as well as how it behaves when receiving out-of-bounds values. Services **may** choose to accept values passed as input even when the value has a higher precision or scale than the service supports, and **should** round the value to fit the supported scale. Alternatively, the service **may** error with `400 Bad Request` (`INVALID_ARGUMENT` in gRPC) if precision would be lost. Services **should** error with `400 Bad Request` (`INVALID_ARGUMENT` in gRPC) if the service receives a value outside of the supported range. */
  value?: string;
}

export const Decimal: Schema.Schema<Decimal> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Decimal" }) as any as Schema.Schema<Decimal>;

export interface ListAccountsResponse {
  /** Continuation token used to page through accounts. To retrieve the next page of the results, set the next request's "page_token" value to this. */
  nextPageToken?: string;
  /** The Accounts returned in the list response. Represented by a partial view of the Account resource, populating `name` and `creation_request_id`. */
  accounts?: Array<Account>;
}

export const ListAccountsResponse: Schema.Schema<ListAccountsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      accounts: Schema.optional(Schema.Array(Account)),
    }),
  ).annotate({
    identifier: "ListAccountsResponse",
  }) as any as Schema.Schema<ListAccountsResponse>;

export interface Address {
  /** City. Max length 60 bytes or 30 characters. */
  city?: string;
  /** Country/Region code. The region is specified as a CLDR region code (e.g. "US", "FR"). */
  regionCode?: string;
  /** Fax number with international code (i.e. +441234567890). */
  fax?: string;
  /** First line of address. Max length 64 bytes or 30 characters. */
  address1?: string;
  /** Phone number with international code (i.e. +441234567890). */
  phone?: string;
  /** Contact name of the company. Max length 128 bytes or 34 characters. */
  contact?: string;
  /** Second line of address. Max length 64 bytes or 30 characters. */
  address2?: string;
  /** Zip/post code. Max length 10 bytes or 10 characters. */
  zip?: string;
  /** State. Max length 60 bytes or 30 characters. */
  state?: string;
  /** Name of the company. Max length 255 bytes or 34 characters. */
  company?: string;
}

export const Address: Schema.Schema<Address> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      city: Schema.optional(Schema.String),
      regionCode: Schema.optional(Schema.String),
      fax: Schema.optional(Schema.String),
      address1: Schema.optional(Schema.String),
      phone: Schema.optional(Schema.String),
      contact: Schema.optional(Schema.String),
      address2: Schema.optional(Schema.String),
      zip: Schema.optional(Schema.String),
      state: Schema.optional(Schema.String),
      company: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Address" }) as any as Schema.Schema<Address>;

export interface EventInfo {
  /** Required. The email address that is associated with the publisher when performing the event. */
  email?: string;
  /** The billing address of the publisher associated with this event, if available. */
  billingAddress?: Address;
}

export const EventInfo: Schema.Schema<EventInfo> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      email: Schema.optional(Schema.String),
      billingAddress: Schema.optional(Address),
    }),
  ).annotate({ identifier: "EventInfo" }) as any as Schema.Schema<EventInfo>;

export interface Event {
  /** Required. Information associated with the event. */
  eventInfo?: EventInfo;
  /** Required. Event timestamp. */
  eventTime?: string;
  /** Required. Event type. */
  eventType?:
    | "EVENT_TYPE_UNSPECIFIED"
    | "LOG_IN_VIA_PLATFORM"
    | "SIGN_UP_VIA_PLATFORM"
    | (string & {});
}

export const Event: Schema.Schema<Event> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      eventInfo: Schema.optional(EventInfo),
      eventTime: Schema.optional(Schema.String),
      eventType: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Event" }) as any as Schema.Schema<Event>;

export interface PlatformGroup {
  /** Identifier. Format: accounts/{account}/platforms/{platform}/groups/{platform_group} */
  name?: string;
  /** Output only. The revenue share of the PlatformGroup, in millipercent (e.g. 15000 = 15%). */
  revshareMillipercent?: Decimal;
  /** Required. Description of the PlatformGroup. */
  description?: string;
}

export const PlatformGroup: Schema.Schema<PlatformGroup> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      revshareMillipercent: Schema.optional(Decimal),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PlatformGroup",
  }) as any as Schema.Schema<PlatformGroup>;

export interface ListPlatformGroupsResponse {
  /** The platform groups returned in this list response. */
  platformGroups?: Array<PlatformGroup>;
  /** Continuation token used to page through platforms. To retrieve the next page of the results, set the next request's "page_token" value to this. */
  nextPageToken?: string;
}

export const ListPlatformGroupsResponse: Schema.Schema<ListPlatformGroupsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      platformGroups: Schema.optional(Schema.Array(PlatformGroup)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListPlatformGroupsResponse",
  }) as any as Schema.Schema<ListPlatformGroupsResponse>;

export interface RequestSiteReviewResponse {}

export const RequestSiteReviewResponse: Schema.Schema<RequestSiteReviewResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "RequestSiteReviewResponse",
  }) as any as Schema.Schema<RequestSiteReviewResponse>;

export interface CloseAccountRequest {}

export const CloseAccountRequest: Schema.Schema<CloseAccountRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CloseAccountRequest",
  }) as any as Schema.Schema<CloseAccountRequest>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

// ==========================================================================
// Operations
// ==========================================================================

export interface LookupPlatformsAccountsRequest {
  /** Required. Platform who parents the account. Format: platforms/{platform} */
  parent: string;
  /** Optional. The creation_request_id provided when calling createAccount. */
  creationRequestId?: string;
}

export const LookupPlatformsAccountsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    creationRequestId: Schema.optional(Schema.String).pipe(
      T.HttpQuery("creationRequestId"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/platforms/{platformsId}/accounts:lookup",
    }),
    svc,
  ) as unknown as Schema.Schema<LookupPlatformsAccountsRequest>;

export type LookupPlatformsAccountsResponse = LookupAccountResponse;
export const LookupPlatformsAccountsResponse =
  /*@__PURE__*/ /*#__PURE__*/ LookupAccountResponse;

export type LookupPlatformsAccountsError = DefaultErrors;

/** Looks up information about a sub-account for a specified creation_request_id. If no account exists for the given creation_request_id, returns 404. */
export const lookupPlatformsAccounts: API.OperationMethod<
  LookupPlatformsAccountsRequest,
  LookupPlatformsAccountsResponse,
  LookupPlatformsAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: LookupPlatformsAccountsRequest,
  output: LookupPlatformsAccountsResponse,
  errors: [],
}));

export interface GetPlatformsAccountsRequest {
  /** Required. Account to get information about. Format: platforms/{platform}/accounts/{account_id} */
  name: string;
}

export const GetPlatformsAccountsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/platforms/{platformsId}/accounts/{accountsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetPlatformsAccountsRequest>;

export type GetPlatformsAccountsResponse = Account;
export const GetPlatformsAccountsResponse = /*@__PURE__*/ /*#__PURE__*/ Account;

export type GetPlatformsAccountsError = DefaultErrors;

/** Gets information about the selected sub-account. */
export const getPlatformsAccounts: API.OperationMethod<
  GetPlatformsAccountsRequest,
  GetPlatformsAccountsResponse,
  GetPlatformsAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPlatformsAccountsRequest,
  output: GetPlatformsAccountsResponse,
  errors: [],
}));

export interface ListPlatformsAccountsRequest {
  /** Optional. A page token, received from a previous `ListAccounts` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Required. Platform who parents the accounts. Format: platforms/{platform} */
  parent: string;
  /** Optional. The maximum number of accounts to include in the response, used for paging. If unspecified, at most 10000 accounts will be returned. The maximum value is 10000; values above 10000 will be coerced to 10000. */
  pageSize?: number;
}

export const ListPlatformsAccountsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({ method: "GET", path: "v1alpha/platforms/{platformsId}/accounts" }),
    svc,
  ) as unknown as Schema.Schema<ListPlatformsAccountsRequest>;

export type ListPlatformsAccountsResponse = ListAccountsResponse;
export const ListPlatformsAccountsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListAccountsResponse;

export type ListPlatformsAccountsError = DefaultErrors;

/** Lists a partial view of sub-accounts for a specific parent account. */
export const listPlatformsAccounts: API.PaginatedOperationMethod<
  ListPlatformsAccountsRequest,
  ListPlatformsAccountsResponse,
  ListPlatformsAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPlatformsAccountsRequest,
  output: ListPlatformsAccountsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ClosePlatformsAccountsRequest {
  /** Required. Account to close. Format: platforms/{platform}/accounts/{account_id} */
  name: string;
  /** Request body */
  body?: CloseAccountRequest;
}

export const ClosePlatformsAccountsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(CloseAccountRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/platforms/{platformsId}/accounts/{accountsId}:close",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ClosePlatformsAccountsRequest>;

export type ClosePlatformsAccountsResponse = CloseAccountResponse;
export const ClosePlatformsAccountsResponse =
  /*@__PURE__*/ /*#__PURE__*/ CloseAccountResponse;

export type ClosePlatformsAccountsError = DefaultErrors;

/** Closes a sub-account. */
export const closePlatformsAccounts: API.OperationMethod<
  ClosePlatformsAccountsRequest,
  ClosePlatformsAccountsResponse,
  ClosePlatformsAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ClosePlatformsAccountsRequest,
  output: ClosePlatformsAccountsResponse,
  errors: [],
}));

export interface CreatePlatformsAccountsRequest {
  /** Required. Platform to create an account for. Format: platforms/{platform} */
  parent: string;
  /** Request body */
  body?: Account;
}

export const CreatePlatformsAccountsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Account).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/platforms/{platformsId}/accounts",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreatePlatformsAccountsRequest>;

export type CreatePlatformsAccountsResponse = Account;
export const CreatePlatformsAccountsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Account;

export type CreatePlatformsAccountsError = DefaultErrors;

/** Creates a sub-account. */
export const createPlatformsAccounts: API.OperationMethod<
  CreatePlatformsAccountsRequest,
  CreatePlatformsAccountsResponse,
  CreatePlatformsAccountsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePlatformsAccountsRequest,
  output: CreatePlatformsAccountsResponse,
  errors: [],
}));

export interface CreatePlatformsAccountsEventsRequest {
  /** Required. Account to log events about. Format: platforms/{platform}/accounts/{account} */
  parent: string;
  /** Request body */
  body?: Event;
}

export const CreatePlatformsAccountsEventsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Event).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/platforms/{platformsId}/accounts/{accountsId}/events",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreatePlatformsAccountsEventsRequest>;

export type CreatePlatformsAccountsEventsResponse = Event;
export const CreatePlatformsAccountsEventsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Event;

export type CreatePlatformsAccountsEventsError = DefaultErrors;

/** Creates an account event. */
export const createPlatformsAccountsEvents: API.OperationMethod<
  CreatePlatformsAccountsEventsRequest,
  CreatePlatformsAccountsEventsResponse,
  CreatePlatformsAccountsEventsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePlatformsAccountsEventsRequest,
  output: CreatePlatformsAccountsEventsResponse,
  errors: [],
}));

export interface DeletePlatformsAccountsSitesRequest {
  /** Required. The name of the site to delete. Format: platforms/{platform}/accounts/{account}/sites/{site} */
  name: string;
}

export const DeletePlatformsAccountsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1alpha/platforms/{platformsId}/accounts/{accountsId}/sites/{sitesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeletePlatformsAccountsSitesRequest>;

export type DeletePlatformsAccountsSitesResponse = Empty;
export const DeletePlatformsAccountsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeletePlatformsAccountsSitesError = DefaultErrors;

/** Deletes a site from a specified account. */
export const deletePlatformsAccountsSites: API.OperationMethod<
  DeletePlatformsAccountsSitesRequest,
  DeletePlatformsAccountsSitesResponse,
  DeletePlatformsAccountsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeletePlatformsAccountsSitesRequest,
  output: DeletePlatformsAccountsSitesResponse,
  errors: [],
}));

export interface RequestReviewPlatformsAccountsSitesRequest {
  /** Required. The name of the site to submit for review. Format: platforms/{platform}/accounts/{account}/sites/{site} */
  name: string;
}

export const RequestReviewPlatformsAccountsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/platforms/{platformsId}/accounts/{accountsId}/sites/{sitesId}:requestReview",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RequestReviewPlatformsAccountsSitesRequest>;

export type RequestReviewPlatformsAccountsSitesResponse =
  RequestSiteReviewResponse;
export const RequestReviewPlatformsAccountsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ RequestSiteReviewResponse;

export type RequestReviewPlatformsAccountsSitesError = DefaultErrors;

/** Requests the review of a site. The site should be in REQUIRES_REVIEW or NEEDS_ATTENTION state. Note: Make sure you place an [ad tag](https://developers.google.com/adsense/platforms/direct/ad-tags) on your site before requesting a review. */
export const requestReviewPlatformsAccountsSites: API.OperationMethod<
  RequestReviewPlatformsAccountsSitesRequest,
  RequestReviewPlatformsAccountsSitesResponse,
  RequestReviewPlatformsAccountsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: RequestReviewPlatformsAccountsSitesRequest,
  output: RequestReviewPlatformsAccountsSitesResponse,
  errors: [],
}));

export interface CreatePlatformsAccountsSitesRequest {
  /** Required. Account to create site. Format: platforms/{platform}/accounts/{account_id} */
  parent: string;
  /** Request body */
  body?: Site;
}

export const CreatePlatformsAccountsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(Site).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1alpha/platforms/{platformsId}/accounts/{accountsId}/sites",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreatePlatformsAccountsSitesRequest>;

export type CreatePlatformsAccountsSitesResponse = Site;
export const CreatePlatformsAccountsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Site;

export type CreatePlatformsAccountsSitesError = DefaultErrors;

/** Creates a site for a specified account. */
export const createPlatformsAccountsSites: API.OperationMethod<
  CreatePlatformsAccountsSitesRequest,
  CreatePlatformsAccountsSitesResponse,
  CreatePlatformsAccountsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreatePlatformsAccountsSitesRequest,
  output: CreatePlatformsAccountsSitesResponse,
  errors: [],
}));

export interface GetPlatformsAccountsSitesRequest {
  /** Required. The name of the site to retrieve. Format: platforms/{platform}/accounts/{account}/sites/{site} */
  name: string;
}

export const GetPlatformsAccountsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/platforms/{platformsId}/accounts/{accountsId}/sites/{sitesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetPlatformsAccountsSitesRequest>;

export type GetPlatformsAccountsSitesResponse = Site;
export const GetPlatformsAccountsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ Site;

export type GetPlatformsAccountsSitesError = DefaultErrors;

/** Gets a site from a specified sub-account. */
export const getPlatformsAccountsSites: API.OperationMethod<
  GetPlatformsAccountsSitesRequest,
  GetPlatformsAccountsSitesResponse,
  GetPlatformsAccountsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetPlatformsAccountsSitesRequest,
  output: GetPlatformsAccountsSitesResponse,
  errors: [],
}));

export interface ListPlatformsAccountsSitesRequest {
  /** The maximum number of sites to include in the response, used for paging. If unspecified, at most 10000 sites will be returned. The maximum value is 10000; values above 10000 will be coerced to 10000. */
  pageSize?: number;
  /** Required. The account which owns the sites. Format: platforms/{platform}/accounts/{account} */
  parent: string;
  /** A page token, received from a previous `ListSites` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSites` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListPlatformsAccountsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/platforms/{platformsId}/accounts/{accountsId}/sites",
    }),
    svc,
  ) as unknown as Schema.Schema<ListPlatformsAccountsSitesRequest>;

export type ListPlatformsAccountsSitesResponse = ListSitesResponse;
export const ListPlatformsAccountsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListSitesResponse;

export type ListPlatformsAccountsSitesError = DefaultErrors;

/** Lists sites for a specific account. */
export const listPlatformsAccountsSites: API.PaginatedOperationMethod<
  ListPlatformsAccountsSitesRequest,
  ListPlatformsAccountsSitesResponse,
  ListPlatformsAccountsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListPlatformsAccountsSitesRequest,
  output: ListPlatformsAccountsSitesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetAccountsPlatformsRequest {
  /** Required. The name of the platform to retrieve. Format: accounts/{account}/platforms/{platform} */
  name: string;
}

export const GetAccountsPlatformsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/accounts/{accountsId}/platforms/{platformsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAccountsPlatformsRequest>;

export type GetAccountsPlatformsResponse = Platform;
export const GetAccountsPlatformsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Platform;

export type GetAccountsPlatformsError = DefaultErrors;

/** Gets a platform. */
export const getAccountsPlatforms: API.OperationMethod<
  GetAccountsPlatformsRequest,
  GetAccountsPlatformsResponse,
  GetAccountsPlatformsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAccountsPlatformsRequest,
  output: GetAccountsPlatformsResponse,
  errors: [],
}));

export interface ListAccountsPlatformsRequest {
  /** Optional. A page token, received from a previous `ListPlatforms` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListPlatforms` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The account which owns the platforms. Format: accounts/{account} */
  parent: string;
  /** Optional. The maximum number of platforms to include in the response, used for paging. If unspecified, at most 10000 platforms will be returned. The maximum value is 10000; values above 10000 will be coerced to 10000. */
  pageSize?: number;
}

export const ListAccountsPlatformsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({ method: "GET", path: "v1alpha/accounts/{accountsId}/platforms" }),
    svc,
  ) as unknown as Schema.Schema<ListAccountsPlatformsRequest>;

export type ListAccountsPlatformsResponse = ListPlatformsResponse;
export const ListAccountsPlatformsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListPlatformsResponse;

export type ListAccountsPlatformsError = DefaultErrors;

/** Lists platforms for a specified account. */
export const listAccountsPlatforms: API.PaginatedOperationMethod<
  ListAccountsPlatformsRequest,
  ListAccountsPlatformsResponse,
  ListAccountsPlatformsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccountsPlatformsRequest,
  output: ListAccountsPlatformsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListAccountsPlatformsGroupsRequest {
  /** Optional. A page token, received from a previous `ListPlatformGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListPlatformGroups` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The name of the platform to retrieve. Format: accounts/{account}/platforms/{platform} */
  parent: string;
  /** Optional. The maximum number of groups to include in the response, used for paging. If unspecified, at most 10000 groups will be returned. The maximum value is 10000; values above 10000 will be coerced to 10000. */
  pageSize?: number;
}

export const ListAccountsPlatformsGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/accounts/{accountsId}/platforms/{platformsId}/groups",
    }),
    svc,
  ) as unknown as Schema.Schema<ListAccountsPlatformsGroupsRequest>;

export type ListAccountsPlatformsGroupsResponse = ListPlatformGroupsResponse;
export const ListAccountsPlatformsGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListPlatformGroupsResponse;

export type ListAccountsPlatformsGroupsError = DefaultErrors;

/** Lists Platform Groups for a specified Platform. */
export const listAccountsPlatformsGroups: API.PaginatedOperationMethod<
  ListAccountsPlatformsGroupsRequest,
  ListAccountsPlatformsGroupsResponse,
  ListAccountsPlatformsGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccountsPlatformsGroupsRequest,
  output: ListAccountsPlatformsGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetAccountsPlatformsGroupsRequest {
  /** Required. The name of the platform group to retrieve. Format: accounts/{account}/platforms/{platform}/groups/{group} */
  name: string;
}

export const GetAccountsPlatformsGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/accounts/{accountsId}/platforms/{platformsId}/groups/{groupsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAccountsPlatformsGroupsRequest>;

export type GetAccountsPlatformsGroupsResponse = PlatformGroup;
export const GetAccountsPlatformsGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PlatformGroup;

export type GetAccountsPlatformsGroupsError = DefaultErrors;

/** Gets a Platform Group for a specified Platform and group. */
export const getAccountsPlatformsGroups: API.OperationMethod<
  GetAccountsPlatformsGroupsRequest,
  GetAccountsPlatformsGroupsResponse,
  GetAccountsPlatformsGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAccountsPlatformsGroupsRequest,
  output: GetAccountsPlatformsGroupsResponse,
  errors: [],
}));

export interface PatchAccountsPlatformsGroupsRequest {
  /** Optional. The list of fields to update - currently only supports updating the `description` field. */
  updateMask?: string;
  /** Identifier. Format: accounts/{account}/platforms/{platform}/groups/{platform_group} */
  name: string;
  /** Request body */
  body?: PlatformGroup;
}

export const PatchAccountsPlatformsGroupsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(PlatformGroup).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1alpha/accounts/{accountsId}/platforms/{platformsId}/groups/{groupsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchAccountsPlatformsGroupsRequest>;

export type PatchAccountsPlatformsGroupsResponse = PlatformGroup;
export const PatchAccountsPlatformsGroupsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PlatformGroup;

export type PatchAccountsPlatformsGroupsError = DefaultErrors;

/** Update a Platform Group. */
export const patchAccountsPlatformsGroups: API.OperationMethod<
  PatchAccountsPlatformsGroupsRequest,
  PatchAccountsPlatformsGroupsResponse,
  PatchAccountsPlatformsGroupsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAccountsPlatformsGroupsRequest,
  output: PatchAccountsPlatformsGroupsResponse,
  errors: [],
}));

export interface PatchAccountsPlatformsChildAccountsSitesRequest {
  /** Identifier. Format: accounts/{account}/platforms/{platform}/childAccounts/{child_account}/sites/{platform_child_site} */
  name: string;
  /** Optional. The list of fields to update - currently only supports updating the `platform_group` field. */
  updateMask?: string;
  /** Request body */
  body?: PlatformChildSite;
}

export const PatchAccountsPlatformsChildAccountsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
    body: Schema.optional(PlatformChildSite).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "v1alpha/accounts/{accountsId}/platforms/{platformsId}/childAccounts/{childAccountsId}/sites/{sitesId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PatchAccountsPlatformsChildAccountsSitesRequest>;

export type PatchAccountsPlatformsChildAccountsSitesResponse =
  PlatformChildSite;
export const PatchAccountsPlatformsChildAccountsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ PlatformChildSite;

export type PatchAccountsPlatformsChildAccountsSitesError = DefaultErrors;

/** Update a Platform Child Site. */
export const patchAccountsPlatformsChildAccountsSites: API.OperationMethod<
  PatchAccountsPlatformsChildAccountsSitesRequest,
  PatchAccountsPlatformsChildAccountsSitesResponse,
  PatchAccountsPlatformsChildAccountsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PatchAccountsPlatformsChildAccountsSitesRequest,
  output: PatchAccountsPlatformsChildAccountsSitesResponse,
  errors: [],
}));

export interface ListAccountsPlatformsChildAccountsSitesRequest {
  /** Required. The name of the child account under the given platform which owns the platform child sites. Format: accounts/{account}/platforms/{platform}/childAccounts/{child_account} */
  parent: string;
  /** Optional. A page token, received from a previous `ListPlatformChildSites` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListPlatformChildSites` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The maximum number of children to include in the response, used for paging. If unspecified, at most 10000 platforms will be returned. The maximum value is 10000; values above 10000 will be coerced to 10000. */
  pageSize?: number;
}

export const ListAccountsPlatformsChildAccountsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/accounts/{accountsId}/platforms/{platformsId}/childAccounts/{childAccountsId}/sites",
    }),
    svc,
  ) as unknown as Schema.Schema<ListAccountsPlatformsChildAccountsSitesRequest>;

export type ListAccountsPlatformsChildAccountsSitesResponse =
  ListPlatformChildSitesResponse;
export const ListAccountsPlatformsChildAccountsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListPlatformChildSitesResponse;

export type ListAccountsPlatformsChildAccountsSitesError = DefaultErrors;

/** Lists Platform Child Sites for a specified Platform Child Account. */
export const listAccountsPlatformsChildAccountsSites: API.PaginatedOperationMethod<
  ListAccountsPlatformsChildAccountsSitesRequest,
  ListAccountsPlatformsChildAccountsSitesResponse,
  ListAccountsPlatformsChildAccountsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListAccountsPlatformsChildAccountsSitesRequest,
  output: ListAccountsPlatformsChildAccountsSitesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetAccountsPlatformsChildAccountsSitesRequest {
  /** Required. The name of the platform child site to retrieve. Format: accounts/{account}/platforms/{platform}/childAccounts/{child_account}/sites/{platform_child_site} */
  name: string;
}

export const GetAccountsPlatformsChildAccountsSitesRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1alpha/accounts/{accountsId}/platforms/{platformsId}/childAccounts/{childAccountsId}/sites/{sitesId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetAccountsPlatformsChildAccountsSitesRequest>;

export type GetAccountsPlatformsChildAccountsSitesResponse = PlatformChildSite;
export const GetAccountsPlatformsChildAccountsSitesResponse =
  /*@__PURE__*/ /*#__PURE__*/ PlatformChildSite;

export type GetAccountsPlatformsChildAccountsSitesError = DefaultErrors;

/** Gets a Platform Child Site for a specified Platform Child Account and site. */
export const getAccountsPlatformsChildAccountsSites: API.OperationMethod<
  GetAccountsPlatformsChildAccountsSitesRequest,
  GetAccountsPlatformsChildAccountsSitesResponse,
  GetAccountsPlatformsChildAccountsSitesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetAccountsPlatformsChildAccountsSitesRequest,
  output: GetAccountsPlatformsChildAccountsSitesResponse,
  errors: [],
}));
