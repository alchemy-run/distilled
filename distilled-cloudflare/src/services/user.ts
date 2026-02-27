/**
 * Cloudflare USER API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service user
 */

import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import type { ApiToken } from "../auth.ts";
import {
  type CommonErrors,
  UnknownCloudflareError,
  CloudflareNetworkError,
  CloudflareHttpError,
} from "../errors.ts";

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

export const listAuditLogs: API.OperationMethod<
  ListAuditLogsRequest,
  ListAuditLogsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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
  zone: { name?: string };
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
      name: Schema.optional(Schema.String),
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

export const listBillingHistories: API.OperationMethod<
  ListBillingHistoriesRequest,
  ListBillingHistoriesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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
  id?: string;
  accountType?: string;
  address?: string;
  address2?: string;
  balance?: string;
  cardExpiryMonth?: number;
  cardExpiryYear?: number;
  cardNumber?: string;
  city?: string;
  company?: string;
  country?: string;
  createdOn?: string;
  deviceData?: string;
  editedOn?: string;
  enterpriseBillingEmail?: string;
  enterprisePrimaryEmail?: string;
  firstName?: string;
  isPartner?: boolean;
  lastName?: string;
  nextBillDate?: string;
  paymentAddress?: string;
  paymentAddress2?: string;
  paymentCity?: string;
  paymentCountry?: string;
  paymentEmail?: string;
  paymentFirstName?: string;
  paymentGateway?: string;
  paymentLastName?: string;
  paymentNonce?: string;
  paymentState?: string;
  paymentZipcode?: string;
  primaryEmail?: string;
  state?: string;
  taxIdType?: string;
  telephone?: string;
  useLegacy?: boolean;
  validationCode?: string;
  vat?: string;
  zipcode?: string;
}

export const GetBillingProfileResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  accountType: Schema.optional(Schema.String),
  address: Schema.optional(Schema.String),
  address2: Schema.optional(Schema.String),
  balance: Schema.optional(Schema.String),
  cardExpiryMonth: Schema.optional(Schema.Number),
  cardExpiryYear: Schema.optional(Schema.Number),
  cardNumber: Schema.optional(Schema.String),
  city: Schema.optional(Schema.String),
  company: Schema.optional(Schema.String),
  country: Schema.optional(Schema.String),
  createdOn: Schema.optional(Schema.String),
  deviceData: Schema.optional(Schema.String),
  editedOn: Schema.optional(Schema.String),
  enterpriseBillingEmail: Schema.optional(Schema.String),
  enterprisePrimaryEmail: Schema.optional(Schema.String),
  firstName: Schema.optional(Schema.String),
  isPartner: Schema.optional(Schema.Boolean),
  lastName: Schema.optional(Schema.String),
  nextBillDate: Schema.optional(Schema.String),
  paymentAddress: Schema.optional(Schema.String),
  paymentAddress2: Schema.optional(Schema.String),
  paymentCity: Schema.optional(Schema.String),
  paymentCountry: Schema.optional(Schema.String),
  paymentEmail: Schema.optional(Schema.String),
  paymentFirstName: Schema.optional(Schema.String),
  paymentGateway: Schema.optional(Schema.String),
  paymentLastName: Schema.optional(Schema.String),
  paymentNonce: Schema.optional(Schema.String),
  paymentState: Schema.optional(Schema.String),
  paymentZipcode: Schema.optional(Schema.String),
  primaryEmail: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  taxIdType: Schema.optional(Schema.String),
  telephone: Schema.optional(Schema.String),
  useLegacy: Schema.optional(Schema.Boolean),
  validationCode: Schema.optional(Schema.String),
  vat: Schema.optional(Schema.String),
  zipcode: Schema.optional(Schema.String),
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

export const getBillingProfile: API.OperationMethod<
  GetBillingProfileRequest,
  GetBillingProfileResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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
  id?: string;
  /** When the invite is no longer active. */
  expiresOn?: string;
  /** The email address of the user who created the invite. */
  invitedBy?: string;
  /** Email address of the user to add to the organization. */
  invitedMemberEmail?: string;
  /** When the invite was sent. */
  invitedOn?: string;
  organizationIsEnforcingTwofactor?: boolean;
  /** Organization name. */
  organizationName?: string;
  /** List of role names the membership has for this account. */
  roles?: string[];
  /** Current status of the invitation. */
  status?: "pending" | "accepted" | "rejected" | "expired";
}

export const GetInviteResponse = Schema.Struct({
  invitedMemberId: Schema.Union([Schema.String, Schema.Null]),
  organizationId: Schema.String,
  id: Schema.optional(Schema.String),
  expiresOn: Schema.optional(Schema.String),
  invitedBy: Schema.optional(Schema.String),
  invitedMemberEmail: Schema.optional(Schema.String),
  invitedOn: Schema.optional(Schema.String),
  organizationIsEnforcingTwofactor: Schema.optional(Schema.Boolean),
  organizationName: Schema.optional(Schema.String),
  roles: Schema.optional(Schema.Array(Schema.String)),
  status: Schema.optional(
    Schema.Literals(["pending", "accepted", "rejected", "expired"]),
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

export const getInvite: API.OperationMethod<
  GetInviteRequest,
  GetInviteResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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
  id?: string;
  expiresOn?: string;
  invitedBy?: string;
  invitedMemberEmail?: string;
  invitedOn?: string;
  organizationIsEnforcingTwofactor?: boolean;
  organizationName?: string;
  roles?: string[];
  status?: "pending" | "accepted" | "rejected" | "expired";
}[];

export const ListInvitesResponse = Schema.Array(
  Schema.Struct({
    invitedMemberId: Schema.Union([Schema.String, Schema.Null]),
    organizationId: Schema.String,
    id: Schema.optional(Schema.String),
    expiresOn: Schema.optional(Schema.String),
    invitedBy: Schema.optional(Schema.String),
    invitedMemberEmail: Schema.optional(Schema.String),
    invitedOn: Schema.optional(Schema.String),
    organizationIsEnforcingTwofactor: Schema.optional(Schema.Boolean),
    organizationName: Schema.optional(Schema.String),
    roles: Schema.optional(Schema.Array(Schema.String)),
    status: Schema.optional(
      Schema.Literals(["pending", "accepted", "rejected", "expired"]),
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

export const listInvites: API.OperationMethod<
  ListInvitesRequest,
  ListInvitesResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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
  id?: string;
  /** When the invite is no longer active. */
  expiresOn?: string;
  /** The email address of the user who created the invite. */
  invitedBy?: string;
  /** Email address of the user to add to the organization. */
  invitedMemberEmail?: string;
  /** When the invite was sent. */
  invitedOn?: string;
  organizationIsEnforcingTwofactor?: boolean;
  /** Organization name. */
  organizationName?: string;
  /** List of role names the membership has for this account. */
  roles?: string[];
  /** Current status of the invitation. */
  status?: "pending" | "accepted" | "rejected" | "expired";
}

export const PatchInviteResponse = Schema.Struct({
  invitedMemberId: Schema.Union([Schema.String, Schema.Null]),
  organizationId: Schema.String,
  id: Schema.optional(Schema.String),
  expiresOn: Schema.optional(Schema.String),
  invitedBy: Schema.optional(Schema.String),
  invitedMemberEmail: Schema.optional(Schema.String),
  invitedOn: Schema.optional(Schema.String),
  organizationIsEnforcingTwofactor: Schema.optional(Schema.Boolean),
  organizationName: Schema.optional(Schema.String),
  roles: Schema.optional(Schema.Array(Schema.String)),
  status: Schema.optional(
    Schema.Literals(["pending", "accepted", "rejected", "expired"]),
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

export const patchInvite: API.OperationMethod<
  PatchInviteRequest,
  PatchInviteResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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

export const getOrganization: API.OperationMethod<
  GetOrganizationRequest,
  GetOrganizationResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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
  id?: string;
  name?: string;
  permissions?: string[];
  roles?: string[];
  status?: "member" | "invited";
}[];

export const ListOrganizationsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    permissions: Schema.optional(Schema.Array(Schema.String)),
    roles: Schema.optional(Schema.Array(Schema.String)),
    status: Schema.optional(Schema.Literals(["member", "invited"])),
  }),
) as unknown as Schema.Schema<ListOrganizationsResponse>;

export const listOrganizations: API.OperationMethod<
  ListOrganizationsRequest,
  ListOrganizationsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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
  id?: string;
}

export const DeleteOrganizationResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
}) as unknown as Schema.Schema<DeleteOrganizationResponse>;

export const deleteOrganization: API.OperationMethod<
  DeleteOrganizationRequest,
  DeleteOrganizationResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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

export const getSubscription: API.OperationMethod<
  GetSubscriptionRequest,
  GetSubscriptionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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

export const putSubscription: API.OperationMethod<
  PutSubscriptionRequest,
  PutSubscriptionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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
  subscriptionId?: string;
}

export const DeleteSubscriptionResponse = Schema.Struct({
  subscriptionId: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({ subscriptionId: "subscription_id" }),
) as unknown as Schema.Schema<DeleteSubscriptionResponse>;

export const deleteSubscription: API.OperationMethod<
  DeleteSubscriptionRequest,
  DeleteSubscriptionResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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

export const getToken: API.OperationMethod<
  GetTokenRequest,
  GetTokenResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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

export const listTokens: API.OperationMethod<
  ListTokensRequest,
  ListTokensResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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
  id?: string;
  condition?: { requestIp?: { in?: string[]; notIn?: string[] } };
  /** The expiration time on or after which the JWT MUST NOT be accepted for processing. */
  expiresOn?: string;
  /** The time on which the token was created. */
  issuedOn?: string;
  /** Last time the token was used. */
  lastUsedOn?: string;
  /** Last time the token was modified. */
  modifiedOn?: string;
  /** Token name. */
  name?: string;
  /** The time before which the token MUST NOT be accepted for processing. */
  notBefore?: string;
  /** List of access policies assigned to the token. */
  policies?: unknown[];
  /** Status of the token. */
  status?: "active" | "disabled" | "expired";
  /** The token value. */
  value?: string;
}

export const CreateTokenResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
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
  issuedOn: Schema.optional(Schema.String),
  lastUsedOn: Schema.optional(Schema.String),
  modifiedOn: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  notBefore: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(Schema.Unknown)),
  status: Schema.optional(Schema.Literals(["active", "disabled", "expired"])),
  value: Schema.optional(Schema.String),
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

export const createToken: API.OperationMethod<
  CreateTokenRequest,
  CreateTokenResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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

export const updateToken: API.OperationMethod<
  UpdateTokenRequest,
  UpdateTokenResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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

export const deleteToken: API.OperationMethod<
  DeleteTokenRequest,
  DeleteTokenResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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
  expiresOn?: string;
  /** The time before which the token MUST NOT be accepted for processing. */
  notBefore?: string;
}

export const VerifyTokenResponse = Schema.Struct({
  id: Schema.String,
  status: Schema.Literals(["active", "disabled", "expired"]),
  expiresOn: Schema.optional(Schema.String),
  notBefore: Schema.optional(Schema.String),
}).pipe(
  Schema.encodeKeys({
    id: "id",
    status: "status",
    expiresOn: "expires_on",
    notBefore: "not_before",
  }),
) as unknown as Schema.Schema<VerifyTokenResponse>;

export const verifyToken: API.OperationMethod<
  VerifyTokenRequest,
  VerifyTokenResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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
  id?: string;
  name?: string;
  scopes?: (
    | "com.cloudflare.api.account"
    | "com.cloudflare.api.account.zone"
    | "com.cloudflare.api.user"
    | "com.cloudflare.edge.r2.bucket"
  )[];
}[];

export const ListTokenPermissionGroupsResponse = Schema.Array(
  Schema.Struct({
    id: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    scopes: Schema.optional(
      Schema.Array(
        Schema.Literals([
          "com.cloudflare.api.account",
          "com.cloudflare.api.account.zone",
          "com.cloudflare.api.user",
          "com.cloudflare.edge.r2.bucket",
        ]),
      ),
    ),
  }),
) as unknown as Schema.Schema<ListTokenPermissionGroupsResponse>;

export const listTokenPermissionGroups: API.OperationMethod<
  ListTokenPermissionGroupsRequest,
  ListTokenPermissionGroupsResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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

export const putTokenValue: API.OperationMethod<
  PutTokenValueRequest,
  PutTokenValueResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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
  id?: string;
  /** Lists the betas that the user is participating in. */
  betas?: string[];
  /** The country in which the user lives. */
  country?: string | null;
  /** User's first name */
  firstName?: string | null;
  /** Indicates whether user has any business zones */
  hasBusinessZones?: boolean;
  /** Indicates whether user has any enterprise zones */
  hasEnterpriseZones?: boolean;
  /** Indicates whether user has any pro zones */
  hasProZones?: boolean;
  /** User's last name */
  lastName?: string | null;
  organizations?: unknown[];
  /** Indicates whether user has been suspended */
  suspended?: boolean;
  /** User's telephone number */
  telephone?: string | null;
  /** Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication. */
  twoFactorAuthenticationEnabled?: boolean;
  /** Indicates whether two-factor authentication is required by one of the accounts that the user is a member of. */
  twoFactorAuthenticationLocked?: boolean;
  /** The zipcode or postal code where the user lives. */
  zipcode?: string | null;
}

export const GetUserResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  betas: Schema.optional(Schema.Array(Schema.String)),
  country: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  firstName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  hasBusinessZones: Schema.optional(Schema.Boolean),
  hasEnterpriseZones: Schema.optional(Schema.Boolean),
  hasProZones: Schema.optional(Schema.Boolean),
  lastName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  organizations: Schema.optional(Schema.Array(Schema.Unknown)),
  suspended: Schema.optional(Schema.Boolean),
  telephone: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  twoFactorAuthenticationEnabled: Schema.optional(Schema.Boolean),
  twoFactorAuthenticationLocked: Schema.optional(Schema.Boolean),
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

export const getUser: API.OperationMethod<
  GetUserRequest,
  GetUserResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
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
  id?: string;
  /** Lists the betas that the user is participating in. */
  betas?: string[];
  /** The country in which the user lives. */
  country?: string | null;
  /** User's first name */
  firstName?: string | null;
  /** Indicates whether user has any business zones */
  hasBusinessZones?: boolean;
  /** Indicates whether user has any enterprise zones */
  hasEnterpriseZones?: boolean;
  /** Indicates whether user has any pro zones */
  hasProZones?: boolean;
  /** User's last name */
  lastName?: string | null;
  organizations?: unknown[];
  /** Indicates whether user has been suspended */
  suspended?: boolean;
  /** User's telephone number */
  telephone?: string | null;
  /** Indicates whether two-factor authentication is enabled for the user account. Does not apply to API authentication. */
  twoFactorAuthenticationEnabled?: boolean;
  /** Indicates whether two-factor authentication is required by one of the accounts that the user is a member of. */
  twoFactorAuthenticationLocked?: boolean;
  /** The zipcode or postal code where the user lives. */
  zipcode?: string | null;
}

export const PatchUserResponse = Schema.Struct({
  id: Schema.optional(Schema.String),
  betas: Schema.optional(Schema.Array(Schema.String)),
  country: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  firstName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  hasBusinessZones: Schema.optional(Schema.Boolean),
  hasEnterpriseZones: Schema.optional(Schema.Boolean),
  hasProZones: Schema.optional(Schema.Boolean),
  lastName: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  organizations: Schema.optional(Schema.Array(Schema.Unknown)),
  suspended: Schema.optional(Schema.Boolean),
  telephone: Schema.optional(Schema.Union([Schema.String, Schema.Null])),
  twoFactorAuthenticationEnabled: Schema.optional(Schema.Boolean),
  twoFactorAuthenticationLocked: Schema.optional(Schema.Boolean),
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

export const patchUser: API.OperationMethod<
  PatchUserRequest,
  PatchUserResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchUserRequest,
  output: PatchUserResponse,
  errors: [],
}));
