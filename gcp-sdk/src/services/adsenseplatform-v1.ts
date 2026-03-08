// ==========================================================================
// AdSense Platform API (adsenseplatform v1)
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
  name: "adsenseplatform",
  version: "v1",
  rootUrl: "https://adsenseplatform.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Site {
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
  /** Output only. Resource name of a site. Format: platforms/{platform}/accounts/{account}/sites/{site} */
  name?: string;
}

export const Site: Schema.Schema<Site> = Schema.suspend(() =>
  Schema.Struct({
    domain: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Site" }) as any as Schema.Schema<Site>;

export interface ListSitesResponse {
  /** The sites returned in this list response. */
  sites?: Array<Site>;
  /** Continuation token used to page through sites. To retrieve the next page of the results, set the next request's "page_token" value to this. */
  nextPageToken?: string;
}

export const ListSitesResponse: Schema.Schema<ListSitesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      sites: Schema.optional(Schema.Array(Site)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListSitesResponse",
  }) as any as Schema.Schema<ListSitesResponse>;

export interface RequestSiteReviewResponse {}

export const RequestSiteReviewResponse: Schema.Schema<RequestSiteReviewResponse> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "RequestSiteReviewResponse",
  }) as any as Schema.Schema<RequestSiteReviewResponse>;

export interface TimeZone {
  /** Optional. IANA Time Zone Database version number. For example "2019a". */
  version?: string;
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  id?: string;
}

export const TimeZone: Schema.Schema<TimeZone> = Schema.suspend(() =>
  Schema.Struct({
    version: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "TimeZone" }) as any as Schema.Schema<TimeZone>;

export interface Address {
  /** Zip/post code. Max length 10 bytes or 10 characters. */
  zip?: string;
  /** Phone number with international code (i.e. +441234567890). */
  phone?: string;
  /** Fax number with international code (i.e. +441234567890). */
  fax?: string;
  /** Country/Region code. The region is specified as a CLDR region code (e.g. "US", "FR"). */
  regionCode?: string;
  /** First line of address. Max length 64 bytes or 30 characters. */
  address1?: string;
  /** State. Max length 60 bytes or 30 characters. */
  state?: string;
  /** City. Max length 60 bytes or 30 characters. */
  city?: string;
  /** Contact name of the company. Max length 128 bytes or 34 characters. */
  contact?: string;
  /** Name of the company. Max length 255 bytes or 34 characters. */
  company?: string;
  /** Second line of address. Max length 64 bytes or 30 characters. */
  address2?: string;
}

export const Address: Schema.Schema<Address> = Schema.suspend(() =>
  Schema.Struct({
    zip: Schema.optional(Schema.String),
    phone: Schema.optional(Schema.String),
    fax: Schema.optional(Schema.String),
    regionCode: Schema.optional(Schema.String),
    address1: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
    city: Schema.optional(Schema.String),
    contact: Schema.optional(Schema.String),
    company: Schema.optional(Schema.String),
    address2: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Address" }) as any as Schema.Schema<Address>;

export interface CloseAccountRequest {}

export const CloseAccountRequest: Schema.Schema<CloseAccountRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CloseAccountRequest",
  }) as any as Schema.Schema<CloseAccountRequest>;

export interface LookupAccountResponse {
  /** The name of the Account Format: platforms/{platform}/accounts/{account_id} */
  name?: string;
}

export const LookupAccountResponse: Schema.Schema<LookupAccountResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LookupAccountResponse",
  }) as any as Schema.Schema<LookupAccountResponse>;

export interface CloseAccountResponse {}

export const CloseAccountResponse: Schema.Schema<CloseAccountResponse> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "CloseAccountResponse",
  }) as any as Schema.Schema<CloseAccountResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface EventInfo {
  /** Required. The email address that is associated with the publisher when performing the event. */
  email?: string;
  /** The billing address of the publisher associated with this event, if available. */
  billingAddress?: Address;
}

export const EventInfo: Schema.Schema<EventInfo> = Schema.suspend(() =>
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

export const Event: Schema.Schema<Event> = Schema.suspend(() =>
  Schema.Struct({
    eventInfo: Schema.optional(EventInfo),
    eventTime: Schema.optional(Schema.String),
    eventType: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Event" }) as any as Schema.Schema<Event>;

export interface Account {
  /** Output only. Creation time of the account. */
  createTime?: string;
  /** Required. An opaque token that uniquely identifies the account among all the platform's accounts. This string may contain at most 64 non-whitespace ASCII characters, but otherwise has no predefined structure. However, it is expected to be a platform-specific identifier for the user creating the account, so that only a single account can be created for any given user. This field must not contain any information that is recognizable as personally identifiable information. e.g. it should not be an email address or login name. Once an account has been created, a second attempt to create an account using the same creation_request_id will result in an ALREADY_EXISTS error. */
  creationRequestId?: string;
  /** Display name of this account. */
  displayName?: string;
  /** Required. The IANA TZ timezone code of this account. For more information, see https://en.wikipedia.org/wiki/List_of_tz_database_time_zones. This field is used for reporting. It is recommended to set it to the same value for all child accounts. */
  timeZone?: TimeZone;
  /** Output only. Resource name of the account. Format: platforms/pub-[0-9]+/accounts/pub-[0-9]+ */
  name?: string;
  /** Required. Input only. CLDR region code of the country/region of the address. Set this to country code of the child account if known, otherwise to your own country code. */
  regionCode?: string;
  /** Output only. Approval state of the account. */
  state?:
    | "STATE_UNSPECIFIED"
    | "UNCHECKED"
    | "APPROVED"
    | "DISAPPROVED"
    | (string & {});
}

export const Account: Schema.Schema<Account> = Schema.suspend(() =>
  Schema.Struct({
    createTime: Schema.optional(Schema.String),
    creationRequestId: Schema.optional(Schema.String),
    displayName: Schema.optional(Schema.String),
    timeZone: Schema.optional(TimeZone),
    name: Schema.optional(Schema.String),
    regionCode: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Account" }) as any as Schema.Schema<Account>;

export interface ListAccountsResponse {
  /** Continuation token used to page through accounts. To retrieve the next page of the results, set the next request's "page_token" value to this. */
  nextPageToken?: string;
  /** The Accounts returned in the list response. Represented by a partial view of the Account resource, populating `name` and `creation_request_id`. */
  accounts?: Array<Account>;
}

export const ListAccountsResponse: Schema.Schema<ListAccountsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      accounts: Schema.optional(Schema.Array(Account)),
    }),
  ).annotate({
    identifier: "ListAccountsResponse",
  }) as any as Schema.Schema<ListAccountsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface GetPlatformsAccountsRequest {
  /** Required. Account to get information about. Format: platforms/{platform}/accounts/{account_id} */
  name: string;
}

export const GetPlatformsAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/platforms/{platformsId}/accounts/{accountsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPlatformsAccountsRequest>;

export type GetPlatformsAccountsResponse = Account;
export const GetPlatformsAccountsResponse = Account;

export type GetPlatformsAccountsError = DefaultErrors;

/** Gets information about the selected sub-account. */
export const getPlatformsAccounts: API.OperationMethod<
  GetPlatformsAccountsRequest,
  GetPlatformsAccountsResponse,
  GetPlatformsAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPlatformsAccountsRequest,
  output: GetPlatformsAccountsResponse,
  errors: [],
}));

export interface LookupPlatformsAccountsRequest {
  /** Required. Platform who parents the account. Format: platforms/{platform} */
  parent: string;
  /** Optional. The creation_request_id provided when calling createAccount. */
  creationRequestId?: string;
}

export const LookupPlatformsAccountsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  creationRequestId: Schema.optional(Schema.String).pipe(
    T.HttpQuery("creationRequestId"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v1/platforms/{platformsId}/accounts:lookup" }),
  svc,
) as unknown as Schema.Schema<LookupPlatformsAccountsRequest>;

export type LookupPlatformsAccountsResponse = LookupAccountResponse;
export const LookupPlatformsAccountsResponse = LookupAccountResponse;

export type LookupPlatformsAccountsError = DefaultErrors;

/** Looks up information about a sub-account for a specified creation_request_id. If no account exists for the given creation_request_id, returns 404. */
export const lookupPlatformsAccounts: API.OperationMethod<
  LookupPlatformsAccountsRequest,
  LookupPlatformsAccountsResponse,
  LookupPlatformsAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: LookupPlatformsAccountsRequest,
  output: LookupPlatformsAccountsResponse,
  errors: [],
}));

export interface ListPlatformsAccountsRequest {
  /** Optional. The maximum number of accounts to include in the response, used for paging. If unspecified, at most 10000 accounts will be returned. The maximum value is 10000; values above 10000 will be coerced to 10000. */
  pageSize?: number;
  /** Required. Platform who parents the accounts. Format: platforms/{platform} */
  parent: string;
  /** Optional. A page token, received from a previous `ListAccounts` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
}

export const ListPlatformsAccountsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/platforms/{platformsId}/accounts" }),
  svc,
) as unknown as Schema.Schema<ListPlatformsAccountsRequest>;

export type ListPlatformsAccountsResponse = ListAccountsResponse;
export const ListPlatformsAccountsResponse = ListAccountsResponse;

export type ListPlatformsAccountsError = DefaultErrors;

/** Lists a partial view of sub-accounts for a specific parent account. */
export const listPlatformsAccounts: API.PaginatedOperationMethod<
  ListPlatformsAccountsRequest,
  ListPlatformsAccountsResponse,
  ListPlatformsAccountsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
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

export const ClosePlatformsAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CloseAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/platforms/{platformsId}/accounts/{accountsId}:close",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ClosePlatformsAccountsRequest>;

export type ClosePlatformsAccountsResponse = CloseAccountResponse;
export const ClosePlatformsAccountsResponse = CloseAccountResponse;

export type ClosePlatformsAccountsError = DefaultErrors;

/** Closes a sub-account. */
export const closePlatformsAccounts: API.OperationMethod<
  ClosePlatformsAccountsRequest,
  ClosePlatformsAccountsResponse,
  ClosePlatformsAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
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

export const CreatePlatformsAccountsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Account).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/platforms/{platformsId}/accounts",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePlatformsAccountsRequest>;

export type CreatePlatformsAccountsResponse = Account;
export const CreatePlatformsAccountsResponse = Account;

export type CreatePlatformsAccountsError = DefaultErrors;

/** Creates a sub-account. */
export const createPlatformsAccounts: API.OperationMethod<
  CreatePlatformsAccountsRequest,
  CreatePlatformsAccountsResponse,
  CreatePlatformsAccountsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePlatformsAccountsRequest,
  output: CreatePlatformsAccountsResponse,
  errors: [],
}));

export interface ListPlatformsAccountsSitesRequest {
  /** A page token, received from a previous `ListSites` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSites` must match the call that provided the page token. */
  pageToken?: string;
  /** The maximum number of sites to include in the response, used for paging. If unspecified, at most 10000 sites will be returned. The maximum value is 10000; values above 10000 will be coerced to 10000. */
  pageSize?: number;
  /** Required. The account which owns the sites. Format: platforms/{platform}/accounts/{account} */
  parent: string;
}

export const ListPlatformsAccountsSitesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/platforms/{platformsId}/accounts/{accountsId}/sites",
  }),
  svc,
) as unknown as Schema.Schema<ListPlatformsAccountsSitesRequest>;

export type ListPlatformsAccountsSitesResponse = ListSitesResponse;
export const ListPlatformsAccountsSitesResponse = ListSitesResponse;

export type ListPlatformsAccountsSitesError = DefaultErrors;

/** Lists sites for a specific account. */
export const listPlatformsAccountsSites: API.PaginatedOperationMethod<
  ListPlatformsAccountsSitesRequest,
  ListPlatformsAccountsSitesResponse,
  ListPlatformsAccountsSitesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListPlatformsAccountsSitesRequest,
  output: ListPlatformsAccountsSitesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetPlatformsAccountsSitesRequest {
  /** Required. The name of the site to retrieve. Format: platforms/{platform}/accounts/{account}/sites/{site} */
  name: string;
}

export const GetPlatformsAccountsSitesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1/platforms/{platformsId}/accounts/{accountsId}/sites/{sitesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetPlatformsAccountsSitesRequest>;

export type GetPlatformsAccountsSitesResponse = Site;
export const GetPlatformsAccountsSitesResponse = Site;

export type GetPlatformsAccountsSitesError = DefaultErrors;

/** Gets a site from a specified sub-account. */
export const getPlatformsAccountsSites: API.OperationMethod<
  GetPlatformsAccountsSitesRequest,
  GetPlatformsAccountsSitesResponse,
  GetPlatformsAccountsSitesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetPlatformsAccountsSitesRequest,
  output: GetPlatformsAccountsSitesResponse,
  errors: [],
}));

export interface DeletePlatformsAccountsSitesRequest {
  /** Required. The name of the site to delete. Format: platforms/{platform}/accounts/{account}/sites/{site} */
  name: string;
}

export const DeletePlatformsAccountsSitesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1/platforms/{platformsId}/accounts/{accountsId}/sites/{sitesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeletePlatformsAccountsSitesRequest>;

export type DeletePlatformsAccountsSitesResponse = Empty;
export const DeletePlatformsAccountsSitesResponse = Empty;

export type DeletePlatformsAccountsSitesError = DefaultErrors;

/** Deletes a site from a specified account. */
export const deletePlatformsAccountsSites: API.OperationMethod<
  DeletePlatformsAccountsSitesRequest,
  DeletePlatformsAccountsSitesResponse,
  DeletePlatformsAccountsSitesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeletePlatformsAccountsSitesRequest,
  output: DeletePlatformsAccountsSitesResponse,
  errors: [],
}));

export interface CreatePlatformsAccountsSitesRequest {
  /** Required. Account to create site. Format: platforms/{platform}/accounts/{account_id} */
  parent: string;
  /** Request body */
  body?: Site;
}

export const CreatePlatformsAccountsSitesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Site).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/platforms/{platformsId}/accounts/{accountsId}/sites",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePlatformsAccountsSitesRequest>;

export type CreatePlatformsAccountsSitesResponse = Site;
export const CreatePlatformsAccountsSitesResponse = Site;

export type CreatePlatformsAccountsSitesError = DefaultErrors;

/** Creates a site for a specified account. */
export const createPlatformsAccountsSites: API.OperationMethod<
  CreatePlatformsAccountsSitesRequest,
  CreatePlatformsAccountsSitesResponse,
  CreatePlatformsAccountsSitesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePlatformsAccountsSitesRequest,
  output: CreatePlatformsAccountsSitesResponse,
  errors: [],
}));

export interface RequestReviewPlatformsAccountsSitesRequest {
  /** Required. The name of the site to submit for review. Format: platforms/{platform}/accounts/{account}/sites/{site} */
  name: string;
}

export const RequestReviewPlatformsAccountsSitesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/platforms/{platformsId}/accounts/{accountsId}/sites/{sitesId}:requestReview",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RequestReviewPlatformsAccountsSitesRequest>;

export type RequestReviewPlatformsAccountsSitesResponse =
  RequestSiteReviewResponse;
export const RequestReviewPlatformsAccountsSitesResponse =
  RequestSiteReviewResponse;

export type RequestReviewPlatformsAccountsSitesError = DefaultErrors;

/** Requests the review of a site. The site should be in REQUIRES_REVIEW or NEEDS_ATTENTION state. Note: Make sure you place an [ad tag](https://developers.google.com/adsense/platforms/direct/ad-tags) on your site before requesting a review. */
export const requestReviewPlatformsAccountsSites: API.OperationMethod<
  RequestReviewPlatformsAccountsSitesRequest,
  RequestReviewPlatformsAccountsSitesResponse,
  RequestReviewPlatformsAccountsSitesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RequestReviewPlatformsAccountsSitesRequest,
  output: RequestReviewPlatformsAccountsSitesResponse,
  errors: [],
}));

export interface CreatePlatformsAccountsEventsRequest {
  /** Required. Account to log events about. Format: platforms/{platform}/accounts/{account} */
  parent: string;
  /** Request body */
  body?: Event;
}

export const CreatePlatformsAccountsEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Event).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/platforms/{platformsId}/accounts/{accountsId}/events",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreatePlatformsAccountsEventsRequest>;

export type CreatePlatformsAccountsEventsResponse = Event;
export const CreatePlatformsAccountsEventsResponse = Event;

export type CreatePlatformsAccountsEventsError = DefaultErrors;

/** Creates an account event. */
export const createPlatformsAccountsEvents: API.OperationMethod<
  CreatePlatformsAccountsEventsRequest,
  CreatePlatformsAccountsEventsResponse,
  CreatePlatformsAccountsEventsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreatePlatformsAccountsEventsRequest,
  output: CreatePlatformsAccountsEventsResponse,
  errors: [],
}));
