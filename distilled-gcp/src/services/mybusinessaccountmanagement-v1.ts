// ==========================================================================
// My Business Account Management API (mybusinessaccountmanagement v1)
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
  name: "mybusinessaccountmanagement",
  version: "v1",
  rootUrl: "https://mybusinessaccountmanagement.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface AcceptInvitationRequest {
}

export const AcceptInvitationRequest: Schema.Schema<AcceptInvitationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AcceptInvitationRequest" }) as any as Schema.Schema<AcceptInvitationRequest>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface DeclineInvitationRequest {
}

export const DeclineInvitationRequest: Schema.Schema<DeclineInvitationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeclineInvitationRequest" }) as any as Schema.Schema<DeclineInvitationRequest>;

export interface PostalAddress {
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

export const PostalAddress: Schema.Schema<PostalAddress> = Schema.suspend(() => Schema.Struct({
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
})).annotate({ identifier: "PostalAddress" }) as any as Schema.Schema<PostalAddress>;

export interface OrganizationInfo {
  /** Output only. The registered domain for the account. */
  registeredDomain?: string;
  /** Output only. The postal address for the account. */
  address?: PostalAddress;
  /** Output only. The contact number for the organization. */
  phoneNumber?: string;
}

export const OrganizationInfo: Schema.Schema<OrganizationInfo> = Schema.suspend(() => Schema.Struct({
  registeredDomain: Schema.optional(Schema.String),
  address: Schema.optional(PostalAddress),
  phoneNumber: Schema.optional(Schema.String),
})).annotate({ identifier: "OrganizationInfo" }) as any as Schema.Schema<OrganizationInfo>;

export interface Account {
  /** Immutable. The resource name, in the format `accounts/{account_id}`. */
  name?: string;
  /** Required. The name of the account. For an account of type `PERSONAL`, this is the first and last name of the user account. */
  accountName?: string;
  /** Required. Input only. The resource name of the account which will be the primary owner of the account being created. It should be of the form `accounts/{account_id}`. */
  primaryOwner?: string;
  /** Required. Contains the type of account. Accounts of type PERSONAL and ORGANIZATION cannot be created using this API. */
  type?: "ACCOUNT_TYPE_UNSPECIFIED" | "PERSONAL" | "LOCATION_GROUP" | "USER_GROUP" | "ORGANIZATION" | (string & {});
  /** Output only. Specifies the AccountRole of this account. */
  role?: "ACCOUNT_ROLE_UNSPECIFIED" | "PRIMARY_OWNER" | "OWNER" | "MANAGER" | "SITE_MANAGER" | (string & {});
  /** Output only. If verified, future locations that are created are automatically connected to Google Maps, and have Google+ pages created, without requiring moderation. */
  verificationState?: "VERIFICATION_STATE_UNSPECIFIED" | "VERIFIED" | "UNVERIFIED" | "VERIFICATION_REQUESTED" | (string & {});
  /** Output only. Indicates whether the account is vetted by Google. A vetted account is able to verify locations via the VETTED_PARTNER method. */
  vettedState?: "VETTED_STATE_UNSPECIFIED" | "NOT_VETTED" | "VETTED" | "INVALID" | (string & {});
  /** Output only. Account reference number if provisioned. */
  accountNumber?: string;
  /** Output only. Specifies the permission level the user has for this account. */
  permissionLevel?: "PERMISSION_LEVEL_UNSPECIFIED" | "OWNER_LEVEL" | "MEMBER_LEVEL" | (string & {});
  /** Output only. Additional info for an organization. This is populated only for an organization account. */
  organizationInfo?: OrganizationInfo;
}

export const Account: Schema.Schema<Account> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  accountName: Schema.optional(Schema.String),
  primaryOwner: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  verificationState: Schema.optional(Schema.String),
  vettedState: Schema.optional(Schema.String),
  accountNumber: Schema.optional(Schema.String),
  permissionLevel: Schema.optional(Schema.String),
  organizationInfo: Schema.optional(OrganizationInfo),
})).annotate({ identifier: "Account" }) as any as Schema.Schema<Account>;

export interface TargetLocation {
  /** The name of the location to which the user is invited. */
  locationName?: string;
  /** The address of the location to which the user is invited. */
  address?: string;
}

export const TargetLocation: Schema.Schema<TargetLocation> = Schema.suspend(() => Schema.Struct({
  locationName: Schema.optional(Schema.String),
  address: Schema.optional(Schema.String),
})).annotate({ identifier: "TargetLocation" }) as any as Schema.Schema<TargetLocation>;

export interface Invitation {
  /** Required. The resource name for the invitation. `accounts/{account_id}/invitations/{invitation_id}`. */
  name?: string;
  /** The sparsely populated account this invitation is for. */
  targetAccount?: Account;
  /** The target location this invitation is for. */
  targetLocation?: TargetLocation;
  /** Output only. The invited role on the account. */
  role?: "ADMIN_ROLE_UNSPECIFIED" | "PRIMARY_OWNER" | "OWNER" | "MANAGER" | "SITE_MANAGER" | (string & {});
  /** Output only. Specifies which target types should appear in the response. */
  targetType?: "TARGET_TYPE_UNSPECIFIED" | "ACCOUNTS_ONLY" | "LOCATIONS_ONLY" | (string & {});
}

export const Invitation: Schema.Schema<Invitation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  targetAccount: Schema.optional(Account),
  targetLocation: Schema.optional(TargetLocation),
  role: Schema.optional(Schema.String),
  targetType: Schema.optional(Schema.String),
})).annotate({ identifier: "Invitation" }) as any as Schema.Schema<Invitation>;

export interface ListInvitationsResponse {
  /** A collection of invitations that are pending for the account. The number of invitations listed here cannot exceed 1000. */
  invitations?: Array<Invitation>;
}

export const ListInvitationsResponse: Schema.Schema<ListInvitationsResponse> = Schema.suspend(() => Schema.Struct({
  invitations: Schema.optional(Schema.Array(Invitation)),
})).annotate({ identifier: "ListInvitationsResponse" }) as any as Schema.Schema<ListInvitationsResponse>;

export interface Admin {
  /** Immutable. The resource name. For account admins, this is in the form: `accounts/{account_id}/admins/{admin_id}` For location admins, this is in the form: `locations/{location_id}/admins/{admin_id}` This field will be ignored if set during admin creation. */
  name?: string;
  /** Optional. The name of the admin. When making the initial invitation, this is the invitee's email address. On `GET` calls, the user's email address is returned if the invitation is still pending. Otherwise, it contains the user's first and last names. This field is only needed to be set during admin creation. */
  admin?: string;
  /** Immutable. The name of the Account resource that this Admin refers to. Used when calling locations.admins.create to invite a LocationGroup as an admin. If both this field and `admin` are set on `CREATE` requests, this field takes precedence and the email address in `admin` will be ignored. Format: `accounts/{account}`. */
  account?: string;
  /** Required. Specifies the role that this admin uses with the specified Account or Location. */
  role?: "ADMIN_ROLE_UNSPECIFIED" | "PRIMARY_OWNER" | "OWNER" | "MANAGER" | "SITE_MANAGER" | (string & {});
  /** Output only. Indicates whether this admin has a pending invitation for the specified resource. */
  pendingInvitation?: boolean;
}

export const Admin: Schema.Schema<Admin> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  admin: Schema.optional(Schema.String),
  account: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  pendingInvitation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Admin" }) as any as Schema.Schema<Admin>;

export interface ListAccountAdminsResponse {
  /** A collection of Admin instances. */
  accountAdmins?: Array<Admin>;
}

export const ListAccountAdminsResponse: Schema.Schema<ListAccountAdminsResponse> = Schema.suspend(() => Schema.Struct({
  accountAdmins: Schema.optional(Schema.Array(Admin)),
})).annotate({ identifier: "ListAccountAdminsResponse" }) as any as Schema.Schema<ListAccountAdminsResponse>;

export interface ListLocationAdminsResponse {
  /** A collection of Admins. */
  admins?: Array<Admin>;
}

export const ListLocationAdminsResponse: Schema.Schema<ListLocationAdminsResponse> = Schema.suspend(() => Schema.Struct({
  admins: Schema.optional(Schema.Array(Admin)),
})).annotate({ identifier: "ListLocationAdminsResponse" }) as any as Schema.Schema<ListLocationAdminsResponse>;

export interface TransferLocationRequest {
  /** Required. Name of the account resource to transfer the location to (for example, "accounts/{account}"). */
  destinationAccount?: string;
}

export const TransferLocationRequest: Schema.Schema<TransferLocationRequest> = Schema.suspend(() => Schema.Struct({
  destinationAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "TransferLocationRequest" }) as any as Schema.Schema<TransferLocationRequest>;

export interface ListAccountsResponse {
  /** A collection of accounts to which the user has access. The personal account of the user doing the query will always be the first item of the result, unless it is filtered out. */
  accounts?: Array<Account>;
  /** If the number of accounts exceeds the requested page size, this field is populated with a token to fetch the next page of accounts on a subsequent call to `accounts.list`. If there are no more accounts, this field is not present in the response. */
  nextPageToken?: string;
}

export const ListAccountsResponse: Schema.Schema<ListAccountsResponse> = Schema.suspend(() => Schema.Struct({
  accounts: Schema.optional(Schema.Array(Account)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAccountsResponse" }) as any as Schema.Schema<ListAccountsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Moves a location from an account that the user owns to another account that the same user administers. The user must be an owner of the account the location is currently associated with and must also be at least a manager of the destination account. */
export interface TransferLocationsRequest {
  /** Required. The name of the location to transfer. `locations/{location_id}`. */
  name: string;
  /** Request body */
  body?: TransferLocationRequest;
}

export const TransferLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(TransferLocationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/locations/{locationsId}:transfer", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TransferLocationsRequest>;

export type TransferLocationsResponse = Empty;
export const TransferLocationsResponse = Empty;

export type TransferLocationsError = CommonErrors;

export const transferLocations: API.OperationMethod<TransferLocationsRequest, TransferLocationsResponse, TransferLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TransferLocationsRequest,
  output: TransferLocationsResponse,
  errors: [],
}));

/** Lists all of the admins for the specified location. */
export interface ListLocationsAdminsRequest {
  /** Required. The name of the location to list admins of. `locations/{location_id}/admins`. */
  parent: string;
}

export const ListLocationsAdminsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/locations/{locationsId}/admins" }),
  svc,
) as unknown as Schema.Schema<ListLocationsAdminsRequest>;

export type ListLocationsAdminsResponse = ListLocationAdminsResponse;
export const ListLocationsAdminsResponse = ListLocationAdminsResponse;

export type ListLocationsAdminsError = CommonErrors;

export const listLocationsAdmins: API.OperationMethod<ListLocationsAdminsRequest, ListLocationsAdminsResponse, ListLocationsAdminsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListLocationsAdminsRequest,
  output: ListLocationsAdminsResponse,
  errors: [],
}));

/** Invites the specified user to become an administrator for the specified location. The invitee must accept the invitation in order to be granted access to the location. See AcceptInvitation to programmatically accept an invitation. */
export interface CreateLocationsAdminsRequest {
  /** Required. The resource name of the location this admin is created for. `locations/{location_id}/admins`. */
  parent: string;
  /** Request body */
  body?: Admin;
}

export const CreateLocationsAdminsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Admin).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/locations/{locationsId}/admins", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateLocationsAdminsRequest>;

export type CreateLocationsAdminsResponse = Admin;
export const CreateLocationsAdminsResponse = Admin;

export type CreateLocationsAdminsError = CommonErrors;

export const createLocationsAdmins: API.OperationMethod<CreateLocationsAdminsRequest, CreateLocationsAdminsResponse, CreateLocationsAdminsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateLocationsAdminsRequest,
  output: CreateLocationsAdminsResponse,
  errors: [],
}));

/** Removes the specified admin as a manager of the specified location. */
export interface DeleteLocationsAdminsRequest {
  /** Required. The resource name of the admin to remove from the location. */
  name: string;
}

export const DeleteLocationsAdminsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/locations/{locationsId}/admins/{adminsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteLocationsAdminsRequest>;

export type DeleteLocationsAdminsResponse = Empty;
export const DeleteLocationsAdminsResponse = Empty;

export type DeleteLocationsAdminsError = CommonErrors;

export const deleteLocationsAdmins: API.OperationMethod<DeleteLocationsAdminsRequest, DeleteLocationsAdminsResponse, DeleteLocationsAdminsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteLocationsAdminsRequest,
  output: DeleteLocationsAdminsResponse,
  errors: [],
}));

/** Updates the Admin for the specified location. Only the AdminRole of the Admin can be updated. */
export interface PatchLocationsAdminsRequest {
  /** Immutable. The resource name. For account admins, this is in the form: `accounts/{account_id}/admins/{admin_id}` For location admins, this is in the form: `locations/{location_id}/admins/{admin_id}` This field will be ignored if set during admin creation. */
  name: string;
  /** Required. The specific fields that should be updated. The only editable field is role. */
  updateMask?: string;
  /** Request body */
  body?: Admin;
}

export const PatchLocationsAdminsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Admin).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/locations/{locationsId}/admins/{adminsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchLocationsAdminsRequest>;

export type PatchLocationsAdminsResponse = Admin;
export const PatchLocationsAdminsResponse = Admin;

export type PatchLocationsAdminsError = CommonErrors;

export const patchLocationsAdmins: API.OperationMethod<PatchLocationsAdminsRequest, PatchLocationsAdminsResponse, PatchLocationsAdminsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchLocationsAdminsRequest,
  output: PatchLocationsAdminsResponse,
  errors: [],
}));

/** Lists all of the accounts for the authenticated user. This includes all accounts that the user owns, as well as any accounts for which the user has management rights. */
export interface ListAccountsRequest {
  /** Optional. The resource name of the account for which the list of directly accessible accounts is to be retrieved. This only makes sense for Organizations and User Groups. If empty, will return `ListAccounts` for the authenticated user. `accounts/{account_id}`. */
  parentAccount?: string;
  /** Optional. How many accounts to fetch per page. The default and maximum is 20. */
  pageSize?: number;
  /** Optional. If specified, the next page of accounts is retrieved. The `pageToken` is returned when a call to `accounts.list` returns more results than can fit into the requested page size. */
  pageToken?: string;
  /** Optional. A filter constraining the accounts to return. The response includes only entries that match the filter. If `filter` is empty, then no constraints are applied and all accounts (paginated) are retrieved for the requested account. For example, a request with the filter `type=USER_GROUP` will only return user groups. The `type` field is the only supported filter. */
  filter?: string;
}

export const ListAccountsRequest = Schema.Struct({
  parentAccount: Schema.optional(Schema.String).pipe(T.HttpQuery("parentAccount")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts" }),
  svc,
) as unknown as Schema.Schema<ListAccountsRequest>;

export type ListAccountsResponse_Op = ListAccountsResponse;
export const ListAccountsResponse_Op = ListAccountsResponse;

export type ListAccountsError = CommonErrors;

export const listAccounts = API.makePaginated(() => ({
  input: ListAccountsRequest,
  output: ListAccountsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the specified account. Returns `NOT_FOUND` if the account does not exist or if the caller does not have access rights to it. */
export interface GetAccountsRequest {
  /** Required. The name of the account to fetch. */
  name: string;
}

export const GetAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsRequest>;

export type GetAccountsResponse = Account;
export const GetAccountsResponse = Account;

export type GetAccountsError = CommonErrors;

export const getAccounts: API.OperationMethod<GetAccountsRequest, GetAccountsResponse, GetAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsRequest,
  output: GetAccountsResponse,
  errors: [],
}));

/** Creates an account with the specified name and type under the given parent. - Personal accounts and Organizations cannot be created. - User Groups cannot be created with a Personal account as primary owner. - Location Groups cannot be created with a primary owner of a Personal account if the Personal account is in an Organization. - Location Groups cannot own Location Groups. */
export interface CreateAccountsRequest {
  /** Request body */
  body?: Account;
}

export const CreateAccountsRequest = Schema.Struct({
  body: Schema.optional(Account).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsRequest>;

export type CreateAccountsResponse = Account;
export const CreateAccountsResponse = Account;

export type CreateAccountsError = CommonErrors;

export const createAccounts: API.OperationMethod<CreateAccountsRequest, CreateAccountsResponse, CreateAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsRequest,
  output: CreateAccountsResponse,
  errors: [],
}));

/** Updates the specified business account. Personal accounts cannot be updated using this method. */
export interface PatchAccountsRequest {
  /** Immutable. The resource name, in the format `accounts/{account_id}`. */
  name: string;
  /** Required. The specific fields that should be updated. The only editable field is `accountName`. */
  updateMask?: string;
  /** Optional. If true, the request is validated without actually updating the account. */
  validateOnly?: boolean;
  /** Request body */
  body?: Account;
}

export const PatchAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Account).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/accounts/{accountsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccountsRequest>;

export type PatchAccountsResponse = Account;
export const PatchAccountsResponse = Account;

export type PatchAccountsError = CommonErrors;

export const patchAccounts: API.OperationMethod<PatchAccountsRequest, PatchAccountsResponse, PatchAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccountsRequest,
  output: PatchAccountsResponse,
  errors: [],
}));

/** Accepts the specified invitation. */
export interface AcceptAccountsInvitationsRequest {
  /** Required. The name of the invitation that is being accepted. `accounts/{account_id}/invitations/{invitation_id}` */
  name: string;
  /** Request body */
  body?: AcceptInvitationRequest;
}

export const AcceptAccountsInvitationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(AcceptInvitationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/invitations/{invitationsId}:accept", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AcceptAccountsInvitationsRequest>;

export type AcceptAccountsInvitationsResponse = Empty;
export const AcceptAccountsInvitationsResponse = Empty;

export type AcceptAccountsInvitationsError = CommonErrors;

export const acceptAccountsInvitations: API.OperationMethod<AcceptAccountsInvitationsRequest, AcceptAccountsInvitationsResponse, AcceptAccountsInvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AcceptAccountsInvitationsRequest,
  output: AcceptAccountsInvitationsResponse,
  errors: [],
}));

/** Declines the specified invitation. */
export interface DeclineAccountsInvitationsRequest {
  /** Required. The name of the account invitation that is being declined. `accounts/{account_id}/invitations/{invitation_id}` */
  name: string;
  /** Request body */
  body?: DeclineInvitationRequest;
}

export const DeclineAccountsInvitationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DeclineInvitationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/invitations/{invitationsId}:decline", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeclineAccountsInvitationsRequest>;

export type DeclineAccountsInvitationsResponse = Empty;
export const DeclineAccountsInvitationsResponse = Empty;

export type DeclineAccountsInvitationsError = CommonErrors;

export const declineAccountsInvitations: API.OperationMethod<DeclineAccountsInvitationsRequest, DeclineAccountsInvitationsResponse, DeclineAccountsInvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeclineAccountsInvitationsRequest,
  output: DeclineAccountsInvitationsResponse,
  errors: [],
}));

/** Lists pending invitations for the specified account. */
export interface ListAccountsInvitationsRequest {
  /** Required. The name of the account from which the list of invitations is being retrieved. `accounts/{account_id}/invitations` */
  parent: string;
  /** Optional. Filtering the response is supported via the Invitation.target_type field. */
  filter?: string;
}

export const ListAccountsInvitationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/invitations" }),
  svc,
) as unknown as Schema.Schema<ListAccountsInvitationsRequest>;

export type ListAccountsInvitationsResponse = ListInvitationsResponse;
export const ListAccountsInvitationsResponse = ListInvitationsResponse;

export type ListAccountsInvitationsError = CommonErrors;

export const listAccountsInvitations: API.OperationMethod<ListAccountsInvitationsRequest, ListAccountsInvitationsResponse, ListAccountsInvitationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListAccountsInvitationsRequest,
  output: ListAccountsInvitationsResponse,
  errors: [],
}));

/** Lists the admins for the specified account. */
export interface ListAccountsAdminsRequest {
  /** Required. The name of the account from which to retrieve a list of admins. `accounts/{account_id}/admins`. */
  parent: string;
}

export const ListAccountsAdminsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/admins" }),
  svc,
) as unknown as Schema.Schema<ListAccountsAdminsRequest>;

export type ListAccountsAdminsResponse = ListAccountAdminsResponse;
export const ListAccountsAdminsResponse = ListAccountAdminsResponse;

export type ListAccountsAdminsError = CommonErrors;

export const listAccountsAdmins: API.OperationMethod<ListAccountsAdminsRequest, ListAccountsAdminsResponse, ListAccountsAdminsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListAccountsAdminsRequest,
  output: ListAccountsAdminsResponse,
  errors: [],
}));

/** Invites the specified user to become an administrator for the specified account. The invitee must accept the invitation in order to be granted access to the account. See AcceptInvitation to programmatically accept an invitation. */
export interface CreateAccountsAdminsRequest {
  /** Required. The resource name of the account this admin is created for. `accounts/{account_id}`. */
  parent: string;
  /** Request body */
  body?: Admin;
}

export const CreateAccountsAdminsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Admin).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/admins", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsAdminsRequest>;

export type CreateAccountsAdminsResponse = Admin;
export const CreateAccountsAdminsResponse = Admin;

export type CreateAccountsAdminsError = CommonErrors;

export const createAccountsAdmins: API.OperationMethod<CreateAccountsAdminsRequest, CreateAccountsAdminsResponse, CreateAccountsAdminsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsAdminsRequest,
  output: CreateAccountsAdminsResponse,
  errors: [],
}));

/** Removes the specified admin from the specified account. */
export interface DeleteAccountsAdminsRequest {
  /** Required. The resource name of the admin to remove from the account. `accounts/{account_id}/admins/{admin_id}`. */
  name: string;
}

export const DeleteAccountsAdminsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/accounts/{accountsId}/admins/{adminsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsAdminsRequest>;

export type DeleteAccountsAdminsResponse = Empty;
export const DeleteAccountsAdminsResponse = Empty;

export type DeleteAccountsAdminsError = CommonErrors;

export const deleteAccountsAdmins: API.OperationMethod<DeleteAccountsAdminsRequest, DeleteAccountsAdminsResponse, DeleteAccountsAdminsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsAdminsRequest,
  output: DeleteAccountsAdminsResponse,
  errors: [],
}));

/** Updates the Admin for the specified Account Admin. */
export interface PatchAccountsAdminsRequest {
  /** Immutable. The resource name. For account admins, this is in the form: `accounts/{account_id}/admins/{admin_id}` For location admins, this is in the form: `locations/{location_id}/admins/{admin_id}` This field will be ignored if set during admin creation. */
  name: string;
  /** Required. The specific fields that should be updated. The only editable field is role. */
  updateMask?: string;
  /** Request body */
  body?: Admin;
}

export const PatchAccountsAdminsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Admin).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/accounts/{accountsId}/admins/{adminsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccountsAdminsRequest>;

export type PatchAccountsAdminsResponse = Admin;
export const PatchAccountsAdminsResponse = Admin;

export type PatchAccountsAdminsError = CommonErrors;

export const patchAccountsAdmins: API.OperationMethod<PatchAccountsAdminsRequest, PatchAccountsAdminsResponse, PatchAccountsAdminsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccountsAdminsRequest,
  output: PatchAccountsAdminsResponse,
  errors: [],
}));

