/**
 * Cloudflare USER API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate.ts --service user
 */

import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import { type DefaultErrors } from "../errors";

// =============================================================================
// AuditLog
// =============================================================================

export interface ListAuditLogsRequest {}

export const ListAuditLogsRequest = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/user/audit_logs" }),
) as unknown as Schema.Schema<ListAuditLogsRequest>;

export type ListAuditLogsResponse = unknown;

export const ListAuditLogsResponse =
  Schema.Unknown as unknown as Schema.Schema<ListAuditLogsResponse>;

export type ListAuditLogsError = DefaultErrors;

export const listAuditLogs: API.OperationMethod<
  ListAuditLogsRequest,
  ListAuditLogsResponse,
  ListAuditLogsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListAuditLogsRequest,
  output: ListAuditLogsResponse,
  errors: [],
}));

// =============================================================================
// BillingHistory
// =============================================================================

export interface ListBillingHistoriesRequest {}

export const ListBillingHistoriesRequest = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/user/billing/history" }),
) as unknown as Schema.Schema<ListBillingHistoriesRequest>;

export type ListBillingHistoriesResponse = {
  id: string;
  action: string;
  amount: number;
  currency: string;
  description: string;
  occurredAt: string;
  type: string;
  zone: { name?: string | null };
}[];

export const ListBillingHistoriesResponse = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    action: Schema.String,
    amount: Schema.Number,
    currency: Schema.String,
    description: Schema.String,
    occurredAt: Schema.String,
    type: Schema.String,
    zone: Schema.Struct({
      name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    }),
  }).pipe(
    Schema.encodeKeys({
      id: "id",
      action: "action",
      amount: "amount",
      currency: "currency",
      description: "description",
      occurredAt: "occurred_at",
      type: "type",
      zone: "zone",
    }),
  ),
) as unknown as Schema.Schema<ListBillingHistoriesResponse>;

export type ListBillingHistoriesError = DefaultErrors;

export const listBillingHistories: API.OperationMethod<
  ListBillingHistoriesRequest,
  ListBillingHistoriesResponse,
  ListBillingHistoriesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListBillingHistoriesRequest,
  output: ListBillingHistoriesResponse,
  errors: [],
}));

// =============================================================================
// BillingProfile
// =============================================================================

export interface GetBillingProfileRequest {}

export const GetBillingProfileRequest = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/user/billing/profile" }),
) as unknown as Schema.Schema<GetBillingProfileRequest>;

export interface GetBillingProfileResponse {
  /** Billing item identifier tag. */
  id?: string | null;
  accountType?: string | null;
  address?: string | null;
  address2?: string | null;
  balance?: string | null;
  cardExpiryMonth?: number | null;
  cardExpiryYear?: number | null;
  cardNumber?: string | null;
  city?: string | null;
  company?: string | null;
  country?: string | null;
  createdOn?: string | null;
  deviceData?: string | null;
  editedOn?: string | null;
  enterpriseBillingEmail?: string | null;
  enterprisePrimaryEmail?: string | null;
  firstName?: string | null;
  isPartner?: boolean | null;
  lastName?: string | null;
  nextBillDate?: string | null;
  paymentAddress?: string | null;
  paymentAddress2?: string | null;
  paymentCity?: string | null;
  paymentCountry?: string | null;
  paymentEmail?: string | null;
  paymentFirstName?: string | null;
  paymentGateway?: string | null;
  paymentLastName?: string | null;
  paymentNonce?: string | null;
  paymentState?: string | null;
  paymentZipcode?: string | null;
  primaryEmail?: string | null;
  state?: string | null;
  taxIdType?: string | null;
  telephone?: string | null;
  useLegacy?: boolean | null;
  validationCode?: string | null;
  vat?: string | null;
  zipcode?: string | null;
}

export const GetBillingProfileResponse = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  accountType: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  address: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  address2: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  balance: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  cardExpiryMonth: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  cardExpiryYear: Schema.optional(Schema.Union([Schema.Number, Schema.Null])),
  cardNumber: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  city: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  company: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  country: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  createdOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  deviceData: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  editedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  enterpriseBillingEmail: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  enterprisePrimaryEmail: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  firstName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  isPartner: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  lastName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  nextBillDate: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  paymentAddress: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  paymentAddress2: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  paymentCity: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  paymentCountry: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  paymentEmail: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  paymentFirstName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  paymentGateway: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  paymentLastName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  paymentNonce: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  paymentState: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  paymentZipcode: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  primaryEmail: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  state: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  taxIdType: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  telephone: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  useLegacy: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  validationCode: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  vat: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  zipcode: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    accountType: "account_type",
    address: "address",
    address2: "address2",
    balance: "balance",
    cardExpiryMonth: "card_expiry_month",
    cardExpiryYear: "card_expiry_year",
    cardNumber: "card_number",
    city: "city",
    company: "company",
    country: "country",
    createdOn: "created_on",
    deviceData: "device_data",
    editedOn: "edited_on",
    enterpriseBillingEmail: "enterprise_billing_email",
    enterprisePrimaryEmail: "enterprise_primary_email",
    firstName: "first_name",
    isPartner: "is_partner",
    lastName: "last_name",
    nextBillDate: "next_bill_date",
    paymentAddress: "payment_address",
    paymentAddress2: "payment_address2",
    paymentCity: "payment_city",
    paymentCountry: "payment_country",
    paymentEmail: "payment_email",
    paymentFirstName: "payment_first_name",
    paymentGateway: "payment_gateway",
    paymentLastName: "payment_last_name",
    paymentNonce: "payment_nonce",
    paymentState: "payment_state",
    paymentZipcode: "payment_zipcode",
    primaryEmail: "primary_email",
    state: "state",
    taxIdType: "tax_id_type",
    telephone: "telephone",
    useLegacy: "use_legacy",
    validationCode: "validation_code",
    vat: "vat",
    zipcode: "zipcode",
  }),
) as unknown as Schema.Schema<GetBillingProfileResponse>;

export type GetBillingProfileError = DefaultErrors;

export const getBillingProfile: API.OperationMethod<
  GetBillingProfileRequest,
  GetBillingProfileResponse,
  GetBillingProfileError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetBillingProfileRequest,
  output: GetBillingProfileResponse,
  errors: [],
}));

// =============================================================================
// Invite
// =============================================================================

export interface GetInviteRequest {
  inviteId: string;
}

export const GetInviteRequest = Schema.Struct({
  inviteId: Schema.String.pipe(T.HttpPath("inviteId")),
}).pipe(
  T.Http({ method: "GET", path: "/user/invites/{inviteId}" }),
) as unknown as Schema.Schema<GetInviteRequest>;

export interface GetInviteResponse {
  /** ID of the user to add to the organization. */
  invitedMemberId: string | null;
  /** ID of the organization the user will be added to. */
  organizationId: string;
  /** Invite identifier tag. */
  id?: string | null;
  /** When the invite is no longer active. */
  expiresOn?: string | null;
  /** The email address of the user who created the invite. */
  invitedBy?: string | null;
  /** Email address of the user to add to the organization. */
  invitedMemberEmail?: string | null;
  /** When the invite was sent. */
  invitedOn?: string | null;
  organizationIsEnforcingTwofactor?: boolean | null;
  /** Organization name. */
  organizationName?: string | null;
  /** List of role names the membership has for this account. */
  roles?: string[] | null;
  /** Current status of the invitation. */
  status?: "pending" | "accepted" | "rejected" | "expired" | null;
}

export const GetInviteResponse = Schema.Struct({
  invitedMemberId: Schema.Union([Schema.String, Schema.Null]),
  organizationId: Schema.String,
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  invitedBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  invitedMemberEmail: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  invitedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  organizationIsEnforcingTwofactor: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  organizationName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  roles: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  status: Schema.optional(
    Schema.Union([
      Schema.Literals(["pending", "accepted", "rejected", "expired"]),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    invitedMemberId: "invited_member_id",
    organizationId: "organization_id",
    id: "id",
    expiresOn: "expires_on",
    invitedBy: "invited_by",
    invitedMemberEmail: "invited_member_email",
    invitedOn: "invited_on",
    organizationIsEnforcingTwofactor: "organization_is_enforcing_twofactor",
    organizationName: "organization_name",
    roles: "roles",
    status: "status",
  }),
) as unknown as Schema.Schema<GetInviteResponse>;

export type GetInviteError = DefaultErrors;

export const getInvite: API.OperationMethod<
  GetInviteRequest,
  GetInviteResponse,
  GetInviteError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetInviteRequest,
  output: GetInviteResponse,
  errors: [],
}));

export interface ListInvitesRequest {}

export const ListInvitesRequest = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/user/invites" }),
) as unknown as Schema.Schema<ListInvitesRequest>;

export type ListInvitesResponse = {
  invitedMemberId: string | null;
  organizationId: string;
  id?: string | null;
  expiresOn?: string | null;
  invitedBy?: string | null;
  invitedMemberEmail?: string | null;
  invitedOn?: string | null;
  organizationIsEnforcingTwofactor?: boolean | null;
  organizationName?: string | null;
  roles?: string[] | null;
  status?: "pending" | "accepted" | "rejected" | "expired" | null;
}[];

export const ListInvitesResponse = Schema.Array(
  Schema.Struct({
    invitedMemberId: Schema.Union([Schema.String, Schema.Null]),
    organizationId: Schema.String,
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    invitedBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    invitedMemberEmail: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    invitedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    organizationIsEnforcingTwofactor: Schema.optional(
      Schema.Union([Schema.Boolean, Schema.Null]),
    ),
    organizationName: Schema.optional(
      Schema.Union([Schema.String, Schema.Null]),
    ),
    roles: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    status: Schema.optional(
      Schema.Union([
        Schema.Literals(["pending", "accepted", "rejected", "expired"]),
        Schema.Null,
      ]),
    ),
  }).pipe(
    Schema.encodeKeys({
      invitedMemberId: "invited_member_id",
      organizationId: "organization_id",
      id: "id",
      expiresOn: "expires_on",
      invitedBy: "invited_by",
      invitedMemberEmail: "invited_member_email",
      invitedOn: "invited_on",
      organizationIsEnforcingTwofactor: "organization_is_enforcing_twofactor",
      organizationName: "organization_name",
      roles: "roles",
      status: "status",
    }),
  ),
) as unknown as Schema.Schema<ListInvitesResponse>;

export type ListInvitesError = DefaultErrors;

export const listInvites: API.OperationMethod<
  ListInvitesRequest,
  ListInvitesResponse,
  ListInvitesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListInvitesRequest,
  output: ListInvitesResponse,
  errors: [],
}));

export interface PatchInviteRequest {
  inviteId: string;
  /** Status of your response to the invitation (rejected or accepted). */
  status: "accepted" | "rejected";
}

export const PatchInviteRequest = Schema.Struct({
  inviteId: Schema.String.pipe(T.HttpPath("inviteId")),
  status: Schema.Literals(["accepted", "rejected"]),
}).pipe(
  T.Http({ method: "PATCH", path: "/user/invites/{inviteId}" }),
) as unknown as Schema.Schema<PatchInviteRequest>;

export interface PatchInviteResponse {
  /** ID of the user to add to the organization. */
  invitedMemberId: string | null;
  /** ID of the organization the user will be added to. */
  organizationId: string;
  /** Invite identifier tag. */
  id?: string | null;
  /** When the invite is no longer active. */
  expiresOn?: string | null;
  /** The email address of the user who created the invite. */
  invitedBy?: string | null;
  /** Email address of the user to add to the organization. */
  invitedMemberEmail?: string | null;
  /** When the invite was sent. */
  invitedOn?: string | null;
  organizationIsEnforcingTwofactor?: boolean | null;
  /** Organization name. */
  organizationName?: string | null;
  /** List of role names the membership has for this account. */
  roles?: string[] | null;
  /** Current status of the invitation. */
  status?: "pending" | "accepted" | "rejected" | "expired" | null;
}

export const PatchInviteResponse = Schema.Struct({
  invitedMemberId: Schema.Union([Schema.String, Schema.Null]),
  organizationId: Schema.String,
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  invitedBy: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  invitedMemberEmail: Schema.optional(
    Schema.Union([Schema.String, Schema.Null]),
  ),
  invitedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  organizationIsEnforcingTwofactor: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  organizationName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  roles: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  status: Schema.optional(
    Schema.Union([
      Schema.Literals(["pending", "accepted", "rejected", "expired"]),
      Schema.Null,
    ]),
  ),
}).pipe(
  Schema.encodeKeys({
    invitedMemberId: "invited_member_id",
    organizationId: "organization_id",
    id: "id",
    expiresOn: "expires_on",
    invitedBy: "invited_by",
    invitedMemberEmail: "invited_member_email",
    invitedOn: "invited_on",
    organizationIsEnforcingTwofactor: "organization_is_enforcing_twofactor",
    organizationName: "organization_name",
    roles: "roles",
    status: "status",
  }),
) as unknown as Schema.Schema<PatchInviteResponse>;

export type PatchInviteError = DefaultErrors;

export const patchInvite: API.OperationMethod<
  PatchInviteRequest,
  PatchInviteResponse,
  PatchInviteError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchInviteRequest,
  output: PatchInviteResponse,
  errors: [],
}));

// =============================================================================
// Organization
// =============================================================================

export interface GetOrganizationRequest {
  organizationId: string;
}

export const GetOrganizationRequest = Schema.Struct({
  organizationId: Schema.String.pipe(T.HttpPath("organizationId")),
}).pipe(
  T.Http({ method: "GET", path: "/user/organizations/{organizationId}" }),
) as unknown as Schema.Schema<GetOrganizationRequest>;

export type GetOrganizationResponse = unknown;

export const GetOrganizationResponse =
  Schema.Unknown as unknown as Schema.Schema<GetOrganizationResponse>;

export type GetOrganizationError = DefaultErrors;

export const getOrganization: API.OperationMethod<
  GetOrganizationRequest,
  GetOrganizationResponse,
  GetOrganizationError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetOrganizationRequest,
  output: GetOrganizationResponse,
  errors: [],
}));

export interface ListOrganizationsRequest {}

export const ListOrganizationsRequest = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/user/organizations" }),
) as unknown as Schema.Schema<ListOrganizationsRequest>;

export type ListOrganizationsResponse = {
  id?: string | null;
  name?: string | null;
  permissions?: string[] | null;
  roles?: string[] | null;
  status?: "member" | "invited" | null;
}[];

export const ListOrganizationsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    permissions: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    roles: Schema.optional(
      Schema.Union([Schema.Array(Schema.String), Schema.Null]),
    ),
    status: Schema.optional(
      Schema.Union([Schema.Literals(["member", "invited"]), Schema.Null]),
    ),
  }),
) as unknown as Schema.Schema<ListOrganizationsResponse>;

export type ListOrganizationsError = DefaultErrors;

export const listOrganizations: API.OperationMethod<
  ListOrganizationsRequest,
  ListOrganizationsResponse,
  ListOrganizationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListOrganizationsRequest,
  output: ListOrganizationsResponse,
  errors: [],
}));

export interface DeleteOrganizationRequest {
  organizationId: string;
}

export const DeleteOrganizationRequest = Schema.Struct({
  organizationId: Schema.String.pipe(T.HttpPath("organizationId")),
}).pipe(
  T.Http({ method: "DELETE", path: "/user/organizations/{organizationId}" }),
) as unknown as Schema.Schema<DeleteOrganizationRequest>;

export interface DeleteOrganizationResponse {
  /** Identifier */
  id?: string | null;
}

export const DeleteOrganizationResponse = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}) as unknown as Schema.Schema<DeleteOrganizationResponse>;

export type DeleteOrganizationError = DefaultErrors;

export const deleteOrganization: API.OperationMethod<
  DeleteOrganizationRequest,
  DeleteOrganizationResponse,
  DeleteOrganizationError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteOrganizationRequest,
  output: DeleteOrganizationResponse,
  errors: [],
}));

// =============================================================================
// Subscription
// =============================================================================

export interface GetSubscriptionRequest {}

export const GetSubscriptionRequest = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/user/subscriptions" }),
) as unknown as Schema.Schema<GetSubscriptionRequest>;

export type GetSubscriptionResponse = unknown;

export const GetSubscriptionResponse =
  Schema.Unknown as unknown as Schema.Schema<GetSubscriptionResponse>;

export type GetSubscriptionError = DefaultErrors;

export const getSubscription: API.OperationMethod<
  GetSubscriptionRequest,
  GetSubscriptionResponse,
  GetSubscriptionError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetSubscriptionRequest,
  output: GetSubscriptionResponse,
  errors: [],
}));

export interface PutSubscriptionRequest {
  identifier: string;
  /** How often the subscription is renewed automatically. */
  frequency?: "weekly" | "monthly" | "quarterly" | "yearly";
  /** The rate plan applied to the subscription. */
  ratePlan?: unknown;
}

export const PutSubscriptionRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
  frequency: Schema.optional(
    Schema.Literals(["weekly", "monthly", "quarterly", "yearly"]),
  ),
  ratePlan: Schema.optional(Schema.Unknown),
}).pipe(
  Schema.encodeKeys({ frequency: "frequency", ratePlan: "rate_plan" }),
  T.Http({ method: "PUT", path: "/user/subscriptions/{identifier}" }),
) as unknown as Schema.Schema<PutSubscriptionRequest>;

export type PutSubscriptionResponse = string | null;

export const PutSubscriptionResponse = Schema.Union([
  Schema.String,
  Schema.Null,
]) as unknown as Schema.Schema<PutSubscriptionResponse>;

export type PutSubscriptionError = DefaultErrors;

export const putSubscription: API.OperationMethod<
  PutSubscriptionRequest,
  PutSubscriptionResponse,
  PutSubscriptionError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PutSubscriptionRequest,
  output: PutSubscriptionResponse,
  errors: [],
}));

export interface DeleteSubscriptionRequest {
  identifier: string;
}

export const DeleteSubscriptionRequest = Schema.Struct({
  identifier: Schema.String.pipe(T.HttpPath("identifier")),
}).pipe(
  T.Http({ method: "DELETE", path: "/user/subscriptions/{identifier}" }),
) as unknown as Schema.Schema<DeleteSubscriptionRequest>;

export interface DeleteSubscriptionResponse {
  /** Subscription identifier tag. */
  subscriptionId?: string | null;
}

export const DeleteSubscriptionResponse = Schema.Struct({
  subscriptionId: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({ subscriptionId: "subscription_id" }),
) as unknown as Schema.Schema<DeleteSubscriptionResponse>;

export type DeleteSubscriptionError = DefaultErrors;

export const deleteSubscription: API.OperationMethod<
  DeleteSubscriptionRequest,
  DeleteSubscriptionResponse,
  DeleteSubscriptionError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteSubscriptionRequest,
  output: DeleteSubscriptionResponse,
  errors: [],
}));

// =============================================================================
// Token
// =============================================================================

export interface GetTokenRequest {
  tokenId: string;
}

export const GetTokenRequest = Schema.Struct({
  tokenId: Schema.String.pipe(T.HttpPath("tokenId")),
}).pipe(
  T.Http({ method: "GET", path: "/user/tokens/{tokenId}" }),
) as unknown as Schema.Schema<GetTokenRequest>;

export type GetTokenResponse = unknown;

export const GetTokenResponse =
  Schema.Unknown as unknown as Schema.Schema<GetTokenResponse>;

export type GetTokenError = DefaultErrors;

export const getToken: API.OperationMethod<
  GetTokenRequest,
  GetTokenResponse,
  GetTokenError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetTokenRequest,
  output: GetTokenResponse,
  errors: [],
}));

export interface ListTokensRequest {}

export const ListTokensRequest = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/user/tokens" }),
) as unknown as Schema.Schema<ListTokensRequest>;

export type ListTokensResponse = unknown;

export const ListTokensResponse =
  Schema.Unknown as unknown as Schema.Schema<ListTokensResponse>;

export type ListTokensError = DefaultErrors;

export const listTokens: API.OperationMethod<
  ListTokensRequest,
  ListTokensResponse,
  ListTokensError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListTokensRequest,
  output: ListTokensResponse,
  errors: [],
}));

export interface CreateTokenRequest {
  /** Token name. */
  name: string;
  /** List of access policies assigned to the token. */
  policies: unknown[];
  condition?: { requestIp?: { in?: string[]; notIn?: string[] } };
  /** The expiration time on or after which the JWT MUST NOT be accepted for processing. */
  expiresOn?: string;
  /** The time before which the token MUST NOT be accepted for processing. */
  notBefore?: string;
}

export const CreateTokenRequest = Schema.Struct({
  name: Schema.String,
  policies: Schema.Array(Schema.Unknown),
  condition: Schema.optional(
    Schema.Struct({
      requestIp: Schema.optional(
        Schema.Struct({
          in: Schema.optional(Schema.Array(Schema.String)),
          notIn: Schema.optional(Schema.Array(Schema.String)),
        }).pipe(Schema.encodeKeys({ in: "in", notIn: "not_in" })),
      ),
    }).pipe(Schema.encodeKeys({ requestIp: "request_ip" })),
  ),
  expiresOn: Schema.optional(Schema.String),
  notBefore: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    name: "name",
    policies: "policies",
    condition: "condition",
    expiresOn: "expires_on",
    notBefore: "not_before",
  }),
  T.Http({ method: "POST", path: "/user/tokens" }),
) as unknown as Schema.Schema<CreateTokenRequest>;

export interface CreateTokenResponse {
  /** Token identifier tag. */
  id?: string | null;
  condition?: {
    requestIp?: { in?: string[] | null; notIn?: string[] | null } | null;
  } | null;
  /** The expiration time on or after which the JWT MUST NOT be accepted for processing. */
  expiresOn?: string | null;
  /** The time on which the token was created. */
  issuedOn?: string | null;
  /** Last time the token was used. */
  lastUsedOn?: string | null;
  /** Last time the token was modified. */
  modifiedOn?: string | null;
  /** Token name. */
  name?: string | null;
  /** The time before which the token MUST NOT be accepted for processing. */
  notBefore?: string | null;
  /** List of access policies assigned to the token. */
  policies?: unknown[] | null;
  /** Status of the token. */
  status?: "active" | "disabled" | "expired" | null;
  /** The token value. */
  value?: string | null;
}

export const CreateTokenResponse = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  condition: Schema.optional(
    Schema.Union([
      Schema.Struct({
        requestIp: Schema.optional(
          Schema.Union([
            Schema.Struct({
              in: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
              notIn: Schema.optional(
                Schema.Union([Schema.Array(Schema.String), Schema.Null]),
              ),
            }).pipe(Schema.encodeKeys({ in: "in", notIn: "not_in" })),
            Schema.Null,
          ]),
        ),
      }).pipe(Schema.encodeKeys({ requestIp: "request_ip" })),
      Schema.Null,
    ]),
  ),
  expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  issuedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  lastUsedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  modifiedOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  notBefore: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  policies: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
  status: Schema.optional(
    Schema.Union([
      Schema.Literals(["active", "disabled", "expired"]),
      Schema.Null,
    ]),
  ),
  value: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    condition: "condition",
    expiresOn: "expires_on",
    issuedOn: "issued_on",
    lastUsedOn: "last_used_on",
    modifiedOn: "modified_on",
    name: "name",
    notBefore: "not_before",
    policies: "policies",
    status: "status",
    value: "value",
  }),
) as unknown as Schema.Schema<CreateTokenResponse>;

export type CreateTokenError = DefaultErrors;

export const createToken: API.OperationMethod<
  CreateTokenRequest,
  CreateTokenResponse,
  CreateTokenError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateTokenRequest,
  output: CreateTokenResponse,
  errors: [],
}));

export interface UpdateTokenRequest {
  tokenId: string;
  /** Token name. */
  name: string;
  /** List of access policies assigned to the token. */
  policies: unknown[];
  condition?: { requestIp?: { in?: string[]; notIn?: string[] } };
  /** The expiration time on or after which the JWT MUST NOT be accepted for processing. */
  expiresOn?: string;
  /** The time before which the token MUST NOT be accepted for processing. */
  notBefore?: string;
  /** Status of the token. */
  status?: "active" | "disabled" | "expired";
}

export const UpdateTokenRequest = Schema.Struct({
  tokenId: Schema.String.pipe(T.HttpPath("tokenId")),
  name: Schema.String,
  policies: Schema.Array(Schema.Unknown),
  condition: Schema.optional(
    Schema.Struct({
      requestIp: Schema.optional(
        Schema.Struct({
          in: Schema.optional(Schema.Array(Schema.String)),
          notIn: Schema.optional(Schema.Array(Schema.String)),
        }).pipe(Schema.encodeKeys({ in: "in", notIn: "not_in" })),
      ),
    }).pipe(Schema.encodeKeys({ requestIp: "request_ip" })),
  ),
  expiresOn: Schema.optional(Schema.String),
  notBefore: Schema.optional(Schema.String),
  status: Schema.optional(Schema.Literals(["active", "disabled", "expired"])),
}).pipe(
  Schema.encodeKeys({
    name: "name",
    policies: "policies",
    condition: "condition",
    expiresOn: "expires_on",
    notBefore: "not_before",
    status: "status",
  }),
  T.Http({ method: "PUT", path: "/user/tokens/{tokenId}" }),
) as unknown as Schema.Schema<UpdateTokenRequest>;

export type UpdateTokenResponse = unknown;

export const UpdateTokenResponse =
  Schema.Unknown as unknown as Schema.Schema<UpdateTokenResponse>;

export type UpdateTokenError = DefaultErrors;

export const updateToken: API.OperationMethod<
  UpdateTokenRequest,
  UpdateTokenResponse,
  UpdateTokenError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: UpdateTokenRequest,
  output: UpdateTokenResponse,
  errors: [],
}));

export interface DeleteTokenRequest {
  tokenId: string;
}

export const DeleteTokenRequest = Schema.Struct({
  tokenId: Schema.String.pipe(T.HttpPath("tokenId")),
}).pipe(
  T.Http({ method: "DELETE", path: "/user/tokens/{tokenId}" }),
) as unknown as Schema.Schema<DeleteTokenRequest>;

export interface DeleteTokenResponse {
  /** Identifier */
  id: string;
}

export const DeleteTokenResponse = Schema.Struct({
  id: Schema.String,
}) as unknown as Schema.Schema<DeleteTokenResponse>;

export type DeleteTokenError = DefaultErrors;

export const deleteToken: API.OperationMethod<
  DeleteTokenRequest,
  DeleteTokenResponse,
  DeleteTokenError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteTokenRequest,
  output: DeleteTokenResponse,
  errors: [],
}));

export interface VerifyTokenRequest {}

export const VerifyTokenRequest = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/user/tokens/verify" }),
) as unknown as Schema.Schema<VerifyTokenRequest>;

export interface VerifyTokenResponse {
  /** Token identifier tag. */
  id: string;
  /** Status of the token. */
  status: "active" | "disabled" | "expired";
  /** The expiration time on or after which the JWT MUST NOT be accepted for processing. */
  expiresOn?: string | null;
  /** The time before which the token MUST NOT be accepted for processing. */
  notBefore?: string | null;
}

export const VerifyTokenResponse = Schema.Struct({
  id: Schema.String,
  status: Schema.Literals(["active", "disabled", "expired"]),
  expiresOn: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  notBefore: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    status: "status",
    expiresOn: "expires_on",
    notBefore: "not_before",
  }),
) as unknown as Schema.Schema<VerifyTokenResponse>;

export type VerifyTokenError = DefaultErrors;

export const verifyToken: API.OperationMethod<
  VerifyTokenRequest,
  VerifyTokenResponse,
  VerifyTokenError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: VerifyTokenRequest,
  output: VerifyTokenResponse,
  errors: [],
}));

// =============================================================================
// TokenPermissionGroup
// =============================================================================

export interface ListTokenPermissionGroupsRequest {}

export const ListTokenPermissionGroupsRequest = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/user/tokens/permission_groups" }),
) as unknown as Schema.Schema<ListTokenPermissionGroupsRequest>;

export type ListTokenPermissionGroupsResponse = {
  id?: string | null;
  name?: string | null;
  scopes?:
    | (
        | "com.cloudflare.api.account"
        | "com.cloudflare.api.account.zone"
        | "com.cloudflare.api.user"
        | "com.cloudflare.edge.r2.bucket"
      )[]
    | null;
}[];

export const ListTokenPermissionGroupsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    name: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
    scopes: Schema.optional(
      Schema.Union([
        Schema.Array(
          Schema.Literals([
            "com.cloudflare.api.account",
            "com.cloudflare.api.account.zone",
            "com.cloudflare.api.user",
            "com.cloudflare.edge.r2.bucket",
          ]),
        ),
        Schema.Null,
      ]),
    ),
  }),
) as unknown as Schema.Schema<ListTokenPermissionGroupsResponse>;

export type ListTokenPermissionGroupsError = DefaultErrors;

export const listTokenPermissionGroups: API.OperationMethod<
  ListTokenPermissionGroupsRequest,
  ListTokenPermissionGroupsResponse,
  ListTokenPermissionGroupsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListTokenPermissionGroupsRequest,
  output: ListTokenPermissionGroupsResponse,
  errors: [],
}));

// =============================================================================
// TokenValue
// =============================================================================

export interface PutTokenValueRequest {
  tokenId: string;
}

export const PutTokenValueRequest = Schema.Struct({
  tokenId: Schema.String.pipe(T.HttpPath("tokenId")),
}).pipe(
  T.Http({ method: "PUT", path: "/user/tokens/{tokenId}/value" }),
) as unknown as Schema.Schema<PutTokenValueRequest>;

export type PutTokenValueResponse = unknown;

export const PutTokenValueResponse =
  Schema.Unknown as unknown as Schema.Schema<PutTokenValueResponse>;

export type PutTokenValueError = DefaultErrors;

export const putTokenValue: API.OperationMethod<
  PutTokenValueRequest,
  PutTokenValueResponse,
  PutTokenValueError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PutTokenValueRequest,
  output: PutTokenValueResponse,
  errors: [],
}));

// =============================================================================
// User
// =============================================================================

export interface GetUserRequest {}

export const GetUserRequest = Schema.Struct({}).pipe(
  T.Http({ method: "GET", path: "/user" }),
) as unknown as Schema.Schema<GetUserRequest>;

export interface GetUserResponse {
  /** Identifier of the user. */
  id?: string | null;
  /** Lists the betas that the user is participating in. */
  betas?: string[] | null;
  /** The country in which the user lives. */
  country?: string | null;
  /** User's first name */
  firstName?: string | null;
  /** Indicates whether user has any business zones */
  hasBusinessZones?: boolean | null;
  /** Indicates whether user has any enterprise zones */
  hasEnterpriseZones?: boolean | null;
  /** Indicates whether user has any pro zones */
  hasProZones?: boolean | null;
  /** User's last name */
  lastName?: string | null;
  organizations?: unknown[] | null;
  /** Indicates whether user has been suspended */
  suspended?: boolean | null;
  /** User's telephone number */
  telephone?: string | null;
  /** Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication. */
  twoFactorAuthenticationEnabled?: boolean | null;
  /** Indicates whether two-factor authentication is required by one of the accounts that the user is a member of. */
  twoFactorAuthenticationLocked?: boolean | null;
  /** The zipcode or postal code where the user lives. */
  zipcode?: string | null;
}

export const GetUserResponse = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  betas: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  country: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  firstName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  hasBusinessZones: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  hasEnterpriseZones: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  hasProZones: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  lastName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  organizations: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
  suspended: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  telephone: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  twoFactorAuthenticationEnabled: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  twoFactorAuthenticationLocked: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  zipcode: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    betas: "betas",
    country: "country",
    firstName: "first_name",
    hasBusinessZones: "has_business_zones",
    hasEnterpriseZones: "has_enterprise_zones",
    hasProZones: "has_pro_zones",
    lastName: "last_name",
    organizations: "organizations",
    suspended: "suspended",
    telephone: "telephone",
    twoFactorAuthenticationEnabled: "two_factor_authentication_enabled",
    twoFactorAuthenticationLocked: "two_factor_authentication_locked",
    zipcode: "zipcode",
  }),
) as unknown as Schema.Schema<GetUserResponse>;

export type GetUserError = DefaultErrors;

export const getUser: API.OperationMethod<
  GetUserRequest,
  GetUserResponse,
  GetUserError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetUserRequest,
  output: GetUserResponse,
  errors: [],
}));

export interface PatchUserRequest {
  /** The country in which the user lives. */
  country?: string | null;
  /** User's first name */
  firstName?: string | null;
  /** User's last name */
  lastName?: string | null;
  /** User's telephone number */
  telephone?: string | null;
  /** The zipcode or postal code where the user lives. */
  zipcode?: string | null;
}

export const PatchUserRequest = Schema.Struct({
  country: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  firstName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  lastName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  telephone: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  zipcode: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    country: "country",
    firstName: "first_name",
    lastName: "last_name",
    telephone: "telephone",
    zipcode: "zipcode",
  }),
  T.Http({ method: "PATCH", path: "/user" }),
) as unknown as Schema.Schema<PatchUserRequest>;

export interface PatchUserResponse {
  /** Identifier of the user. */
  id?: string | null;
  /** Lists the betas that the user is participating in. */
  betas?: string[] | null;
  /** The country in which the user lives. */
  country?: string | null;
  /** User's first name */
  firstName?: string | null;
  /** Indicates whether user has any business zones */
  hasBusinessZones?: boolean | null;
  /** Indicates whether user has any enterprise zones */
  hasEnterpriseZones?: boolean | null;
  /** Indicates whether user has any pro zones */
  hasProZones?: boolean | null;
  /** User's last name */
  lastName?: string | null;
  organizations?: unknown[] | null;
  /** Indicates whether user has been suspended */
  suspended?: boolean | null;
  /** User's telephone number */
  telephone?: string | null;
  /** Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication. */
  twoFactorAuthenticationEnabled?: boolean | null;
  /** Indicates whether two-factor authentication is required by one of the accounts that the user is a member of. */
  twoFactorAuthenticationLocked?: boolean | null;
  /** The zipcode or postal code where the user lives. */
  zipcode?: string | null;
}

export const PatchUserResponse = Schema.Struct({
  id: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  betas: Schema.optional(
    Schema.Union([Schema.Array(Schema.String), Schema.Null]),
  ),
  country: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  firstName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  hasBusinessZones: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  hasEnterpriseZones: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  hasProZones: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  lastName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  organizations: Schema.optional(
    Schema.Union([Schema.Array(Schema.Unknown), Schema.Null]),
  ),
  suspended: Schema.optional(Schema.Union([Schema.Boolean, Schema.Null])),
  telephone: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  twoFactorAuthenticationEnabled: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  twoFactorAuthenticationLocked: Schema.optional(
    Schema.Union([Schema.Boolean, Schema.Null]),
  ),
  zipcode: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    betas: "betas",
    country: "country",
    firstName: "first_name",
    hasBusinessZones: "has_business_zones",
    hasEnterpriseZones: "has_enterprise_zones",
    hasProZones: "has_pro_zones",
    lastName: "last_name",
    organizations: "organizations",
    suspended: "suspended",
    telephone: "telephone",
    twoFactorAuthenticationEnabled: "two_factor_authentication_enabled",
    twoFactorAuthenticationLocked: "two_factor_authentication_locked",
    zipcode: "zipcode",
  }),
) as unknown as Schema.Schema<PatchUserResponse>;

export type PatchUserError = DefaultErrors;

export const patchUser: API.OperationMethod<
  PatchUserRequest,
  PatchUserResponse,
  PatchUserError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchUserRequest,
  output: PatchUserResponse,
  errors: [],
}));
