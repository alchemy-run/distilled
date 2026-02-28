// ==========================================================================
// Cloud Commerce Partner Procurement API (cloudcommerceprocurement v1)
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
  name: "cloudcommerceprocurement",
  version: "v1",
  rootUrl: "https://cloudcommerceprocurement.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Approval {
  /** Output only. The name of the approval. */
  name?: string;
  /** Output only. The state of the approval. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "APPROVED" | "REJECTED" | (string & {});
  /** Output only. An explanation for the state of the approval. */
  reason?: string;
  /** Optional. The last update timestamp of the approval. */
  updateTime?: string;
}

export const Approval: Schema.Schema<Approval> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Approval" }) as any as Schema.Schema<Approval>;

export interface Account {
  /** Output only. The resource name of the account. Account names have the form `accounts/{account_id}`. */
  name?: string;
  /** Output only. The last update timestamp. */
  updateTime?: string;
  /** Output only. The creation timestamp. */
  createTime?: string;
  /** Output only. The identifier of the service provider that this account was created against. Each service provider is assigned a unique provider value when they onboard with Cloud Commerce platform. */
  provider?: string;
  /** Output only. The state of the account. This is used to decide whether the customer is in good standing with the provider and is able to make purchases. An account might not be able to make a purchase if the billing account is suspended, for example. */
  state?: "ACCOUNT_STATE_UNSPECIFIED" | "ACCOUNT_ACTIVATION_REQUESTED" | "ACCOUNT_ACTIVE" | (string & {});
  /** Output only. The custom properties that were collected from the user to create this account. */
  inputProperties?: Record<string, unknown>;
  /** Output only. The approvals for this account. These approvals are used to track actions that are permitted or have been completed by a customer within the context of the provider. This might include a sign up flow or a provisioning step, for example, that the provider can admit to having happened. */
  approvals?: Array<Approval>;
  /** Output only. The reseller parent billing account of the account's corresponding billing account, applicable only when the corresponding billing account is a subaccount of a reseller. Included in responses only for view: ACCOUNT_VIEW_FULL. Format: billingAccounts/{billing_account_id} */
  resellerParentBillingAccount?: string;
}

export const Account: Schema.Schema<Account> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  provider: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  inputProperties: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  approvals: Schema.optional(Schema.Array(Approval)),
  resellerParentBillingAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "Account" }) as any as Schema.Schema<Account>;

export interface ListAccountsResponse {
  /** The list of accounts in this response. */
  accounts?: Array<Account>;
  /** The token for fetching the next page. */
  nextPageToken?: string;
}

export const ListAccountsResponse: Schema.Schema<ListAccountsResponse> = Schema.suspend(() => Schema.Struct({
  accounts: Schema.optional(Schema.Array(Account)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAccountsResponse" }) as any as Schema.Schema<ListAccountsResponse>;

export interface ApproveAccountRequest {
  /** Set of properties that should be associated with the account. Optional. */
  properties?: Record<string, string>;
  /** The name of the approval being approved. If absent and there is only one approval possible, that approval will be granted. If absent and there are many approvals possible, the request will fail with a 400 Bad Request. Optional. */
  approvalName?: string;
  /** Free form text string explaining the approval reason. Optional. Max allowed length: 256 bytes. Longer strings will be truncated. */
  reason?: string;
}

export const ApproveAccountRequest: Schema.Schema<ApproveAccountRequest> = Schema.suspend(() => Schema.Struct({
  properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  approvalName: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "ApproveAccountRequest" }) as any as Schema.Schema<ApproveAccountRequest>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface RejectAccountRequest {
  /** The name of the approval being rejected. If absent and there is only one approval possible, that approval will be rejected. If absent and there are many approvals possible, the request will fail with a 400 Bad Request. Optional. */
  approvalName?: string;
  /** Free form text string explaining the rejection reason. Max allowed length: 256 bytes. Longer strings will be truncated. */
  reason?: string;
}

export const RejectAccountRequest: Schema.Schema<RejectAccountRequest> = Schema.suspend(() => Schema.Struct({
  approvalName: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "RejectAccountRequest" }) as any as Schema.Schema<RejectAccountRequest>;

export interface ResetAccountRequest {
}

export const ResetAccountRequest: Schema.Schema<ResetAccountRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResetAccountRequest" }) as any as Schema.Schema<ResetAccountRequest>;

export interface Consumer {
  /** A project name with format `projects/`. */
  project?: string;
}

export const Consumer: Schema.Schema<Consumer> = Schema.suspend(() => Schema.Struct({
  project: Schema.optional(Schema.String),
})).annotate({ identifier: "Consumer" }) as any as Schema.Schema<Consumer>;

export interface Entitlement {
  /** Output only. The resource name of the entitlement. Entitlement names have the form `providers/{provider_id}/entitlements/{entitlement_id}`. */
  name?: string;
  /** Output only. The resource name of the account that this entitlement is based on, if any. */
  account?: string;
  /** Output only. The identifier of the service provider that this entitlement was created against. Each service provider is assigned a unique provider value when they onboard with Cloud Commerce platform. */
  provider?: string;
  /** Output only. The identifier of the entity that was purchased. This may actually represent a product, quote, or offer. We strongly recommend that you use the following more explicit fields: productExternalName, quoteExternalName, or offer. */
  product?: string;
  /** Output only. The identifier of the quote that was used to procure. Empty if the order is not purchased using a quote. */
  quoteExternalName?: string;
  /** Output only. The identifier of the product that was procured. */
  productExternalName?: string;
  /** Output only. The identifier of the plan that was procured. Required if the product has plans. */
  plan?: string;
  /** Output only. The name of the offer that was procured. Field is empty if order wasn't made using an offer. Format: 'projects/{project}/services/{service}/privateOffers/{offer}' OR 'projects/{project}/services/{service}/standardOffers/{offer}', depending on whether the offer is private or public. The {service} in the name is the listing service of the offer. It could be either the product service that the offer is referencing, or a generic private offer parent service. We recommend that you don't build your integration to rely on the meaning of this {service} part. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, this field is populated with the upcoming offer. * If the entitlement is in the state ENTITLEMENT_ACTIVE, ENTITLEMENT_PENDING_CANCELLATION, ENTITLEMENT_PENDING_PLAN_CHANGE, or ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL, this field is populated with the current offer. * If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is populated with the latest offer that the order was associated with. */
  offer?: string;
  /** Output only. Upon a pending plan change, the name of the offer that the entitlement is switching to. Only exists if the pending plan change is moving to an offer. This field isn't populated for entitlements which aren't active yet. Format: 'projects/{project}/services/{service}/privateOffers/{offer}' OR 'projects/{project}/services/{service}/standardOffers/{offer}', depending on whether the offer is private or public. The {service} in the name is the listing service of the offer. It could be either the product service that the offer is referencing, or a generic private offer parent service. We recommend that you don't build your integration to rely on the meaning of this {service} part. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, ENTITLEMENT_ACTIVE or ENTITLEMENT_PENDING_CANCELLATION, then this field is empty. * If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL or ENTITLEMENT_PENDING_PLAN_CHANGE, then this field is populated with the upcoming offer. * If the entitlement is in the state ENTITLEMENT_CANCELLED, then this is empty. */
  newPendingOffer?: string;
  /** Output only. The timestamp when the new offer becomes effective. This field is populated even if the entitlement isn't active yet. If there's no upcoming offer, the field is empty. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, this field isn't populated when the entitlement isn't yet approved. After the entitlement is approved, this field is populated with the effective time of the upcoming offer. * If the entitlement is in the state ENTITLEMENT_ACTIVE or ENTITLEMENT_PENDING_CANCELLATION, this field isn't populated. * If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL, this field isn't populated, because the entitlement change is waiting on approval. * If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE, this field is populated with the expected effective time of the upcoming offer, which is in the future. * If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is empty. */
  newOfferStartTime?: string;
  /** Output only. The offer duration of the current offer, in ISO 8601 duration format. This is empty if the entitlement wasn't made using an offer, or if the offer has a specified end date instead of a duration. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, and the upcoming offer doesn't have a specified end date, then this field is populated with the duration of the upcoming offer. Otherwise, this field is empty. * If the entitlement is in the state ENTITLEMENT_ACTIVE, ENTITLEMENT_PENDING_CANCELLATION, ENTITLEMENT_PENDING_PLAN_CHANGE, or ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL, and the current offer doesn't have a specified end date, then this field contains the duration of the current offer. Otherwise, this field is empty. * If the entitlement is in the state ENTITLEMENT_CANCELLED, and the offer doesn't have a specified end date, then this field is populated with the duration of the latest offer that the order was associated with. Otherwise, this field is empty. */
  offerDuration?: string;
  /** Output only. The duration of the new offer, in ISO 8601 duration format. This field is populated for pending offer changes. It isn't populated for entitlements which aren't active yet. If the offer has a specified end date instead of a duration, this field is empty. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, ENTITLEMENT_ACTIVE, or ENTITLEMENT_PENDING_CANCELLATION, this field is empty. * If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL or ENTITLEMENT_PENDING_PLAN_CHANGE, and the upcoming offer doesn't have a specified end date, then this field is populated with the duration of the upcoming offer. Otherwise, this field is empty. * If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is empty. */
  newPendingOfferDuration?: string;
  /** Output only. End time for the current term of the Offer associated with this entitlement. The value of this field can change naturally over time due to auto-renewal, even if the offer isn't changed. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, then: * If the entitlement isn't approved yet approved, and the offer has a specified end date, then this field is populated with the expected end time of the upcoming offer, in the future. Otherwise, this field is empty. * If the entitlement is approved, then this field is populated with the expected end time of the upcoming offer, in the future. This means that this field and the field offer_duration can both exist. * If the entitlement is in the state ENTITLEMENT_ACTIVE or ENTITLEMENT_PENDING_CANCELLATION, then this field is populated with the expected end time of the current offer, in the future. This field's value is set regardless of whether the offer has a specific end date or a duration. This means that this field and the field offer_duration can both exist. * If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL or ENTITLEMENT_PENDING_PLAN_CHANGE: * If the entitlement's pricing model is usage based and the associated offer is a private offer whose term has ended, then this field reflects the ACTUAL end time of the entitlement's associated offer (in the past), even though the entitlement associated with this private offer does not terminate at the end of that private offer's term. * Otherwise, this is the expected end date of the current offer, in the future. * If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is populated with the end time, in the past, of the latest offer that the order was associated with. If the entitlement was cancelled before any offer started, then this field is empty. */
  offerEndTime?: string;
  /** Output only. The end time of the new offer, determined from the offer's specified end date. If the offer des not have a specified end date then this field is not set. This field is populated even if the entitlement isn't active yet. If there's no upcoming offer, the field is empty. * If the entitlement is in the state ENTITLEMENT_ACTIVATION_REQUESTED, ENTITLEMENT_ACTIVE, or ENTITLEMENT_PENDING_CANCELLATION, then this field is empty. * If the entitlement is in the state ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL or ENTITLEMENT_PENDING_PLAN_CHANGE, and the upcoming offer has a specified end date, then this field is populated with the expected end time of the upcoming offer, in the future. Otherwise, this field is empty. * If the entitlement is in the state ENTITLEMENT_CANCELLED, then this field is empty. */
  newOfferEndTime?: string;
  /** Output only. The identifier of the pending new plan. Required if the product has plans and the entitlement has a pending plan change. */
  newPendingPlan?: string;
  /** Output only. The state of the entitlement. */
  state?: "ENTITLEMENT_STATE_UNSPECIFIED" | "ENTITLEMENT_ACTIVATION_REQUESTED" | "ENTITLEMENT_ACTIVE" | "ENTITLEMENT_PENDING_CANCELLATION" | "ENTITLEMENT_CANCELLED" | "ENTITLEMENT_PENDING_PLAN_CHANGE" | "ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL" | "ENTITLEMENT_SUSPENDED" | (string & {});
  /** Output only. The custom properties that were collected from the user to create this entitlement. */
  inputProperties?: Record<string, unknown>;
  /** Output only. The last update timestamp. */
  updateTime?: string;
  /** Output only. The creation timestamp. */
  createTime?: string;
  /** Output only. The consumerId to use when reporting usage through the Service Control API. See the consumerId field at [Reporting Metrics](https://cloud.google.com/service-control/reporting-metrics) for more details. This field is present only if the product has usage-based billing configured. */
  usageReportingId?: string;
  /** Provider-supplied message that is displayed to the end user. Currently this is used to communicate progress and ETA for provisioning. This field can be updated only when a user is waiting for an action from the provider, i.e. entitlement state is EntitlementState.ENTITLEMENT_ACTIVATION_REQUESTED or EntitlementState.ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL. This field is cleared automatically when the entitlement state changes. */
  messageToUser?: string;
  /** Output only. The resources using this entitlement, if applicable. */
  consumers?: Array<Consumer>;
  /** Output only. End time for the subscription corresponding to this entitlement. */
  subscriptionEndTime?: string;
  /** Output only. The order ID of this entitlement, without any `orders/` resource name prefix. */
  orderId?: string;
  /** Output only. The entitlement benefit IDs associated with the purchase. */
  entitlementBenefitIds?: Array<string>;
  /** Output only. The reason the entitlement was cancelled. If this entitlement wasn't cancelled, this field is empty. Possible values include "unknown", "expired", "user-cancelled", "account-closed", "billing-disabled" (if the customer has manually disabled billing to their resources), "user-aborted", and "migrated" (if the entitlement has migrated across products). Values of this field are subject to change, and we recommend that you don't build your technical integration to rely on these fields. */
  cancellationReason?: string;
}

export const Entitlement: Schema.Schema<Entitlement> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  account: Schema.optional(Schema.String),
  provider: Schema.optional(Schema.String),
  product: Schema.optional(Schema.String),
  quoteExternalName: Schema.optional(Schema.String),
  productExternalName: Schema.optional(Schema.String),
  plan: Schema.optional(Schema.String),
  offer: Schema.optional(Schema.String),
  newPendingOffer: Schema.optional(Schema.String),
  newOfferStartTime: Schema.optional(Schema.String),
  offerDuration: Schema.optional(Schema.String),
  newPendingOfferDuration: Schema.optional(Schema.String),
  offerEndTime: Schema.optional(Schema.String),
  newOfferEndTime: Schema.optional(Schema.String),
  newPendingPlan: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  inputProperties: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  usageReportingId: Schema.optional(Schema.String),
  messageToUser: Schema.optional(Schema.String),
  consumers: Schema.optional(Schema.Array(Consumer)),
  subscriptionEndTime: Schema.optional(Schema.String),
  orderId: Schema.optional(Schema.String),
  entitlementBenefitIds: Schema.optional(Schema.Array(Schema.String)),
  cancellationReason: Schema.optional(Schema.String),
})).annotate({ identifier: "Entitlement" }) as any as Schema.Schema<Entitlement>;

export interface ListEntitlementsResponse {
  /** The list of entitlements in this response. */
  entitlements?: Array<Entitlement>;
  /** The token for fetching the next page. */
  nextPageToken?: string;
}

export const ListEntitlementsResponse: Schema.Schema<ListEntitlementsResponse> = Schema.suspend(() => Schema.Struct({
  entitlements: Schema.optional(Schema.Array(Entitlement)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListEntitlementsResponse" }) as any as Schema.Schema<ListEntitlementsResponse>;

export interface ApproveEntitlementRequest {
  /** Set of properties that should be associated with the entitlement. Optional. */
  properties?: Record<string, string>;
  /** Optional. The resource name of the entitlement that was migrated, with the format `providers/{provider_id}/entitlements/{entitlement_id}`. Should only be sent when resources have been migrated from entitlement_migrated to the new entitlement. Optional. */
  entitlementMigrated?: string;
}

export const ApproveEntitlementRequest: Schema.Schema<ApproveEntitlementRequest> = Schema.suspend(() => Schema.Struct({
  properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  entitlementMigrated: Schema.optional(Schema.String),
})).annotate({ identifier: "ApproveEntitlementRequest" }) as any as Schema.Schema<ApproveEntitlementRequest>;

export interface RejectEntitlementRequest {
  /** Free form text string explaining the rejection reason. Max allowed length: 256 bytes. Longer strings will be truncated. */
  reason?: string;
}

export const RejectEntitlementRequest: Schema.Schema<RejectEntitlementRequest> = Schema.suspend(() => Schema.Struct({
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "RejectEntitlementRequest" }) as any as Schema.Schema<RejectEntitlementRequest>;

export interface ApproveEntitlementPlanChangeRequest {
  /** Required. Name of the pending plan that's being approved. */
  pendingPlanName?: string;
}

export const ApproveEntitlementPlanChangeRequest: Schema.Schema<ApproveEntitlementPlanChangeRequest> = Schema.suspend(() => Schema.Struct({
  pendingPlanName: Schema.optional(Schema.String),
})).annotate({ identifier: "ApproveEntitlementPlanChangeRequest" }) as any as Schema.Schema<ApproveEntitlementPlanChangeRequest>;

export interface RejectEntitlementPlanChangeRequest {
  /** Free form text string explaining the rejection reason. Max allowed length: 256 bytes. Longer strings will be truncated. */
  reason?: string;
  /** Required. Name of the pending plan that is being rejected. */
  pendingPlanName?: string;
}

export const RejectEntitlementPlanChangeRequest: Schema.Schema<RejectEntitlementPlanChangeRequest> = Schema.suspend(() => Schema.Struct({
  reason: Schema.optional(Schema.String),
  pendingPlanName: Schema.optional(Schema.String),
})).annotate({ identifier: "RejectEntitlementPlanChangeRequest" }) as any as Schema.Schema<RejectEntitlementPlanChangeRequest>;

export interface SuspendEntitlementRequest {
  /** A free-form reason string, explaining the reason for suspension request. */
  reason?: string;
}

export const SuspendEntitlementRequest: Schema.Schema<SuspendEntitlementRequest> = Schema.suspend(() => Schema.Struct({
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "SuspendEntitlementRequest" }) as any as Schema.Schema<SuspendEntitlementRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets a requested Account resource. */
export interface GetProvidersAccountsRequest {
  /** Required. The name of the account to retrieve. */
  name: string;
  /** Optional. What information to include in the response. */
  view?: "ACCOUNT_VIEW_UNSPECIFIED" | "ACCOUNT_VIEW_BASIC" | "ACCOUNT_VIEW_FULL" | (string & {});
}

export const GetProvidersAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/providers/{providersId}/accounts/{accountsId}" }),
  svc,
) as unknown as Schema.Schema<GetProvidersAccountsRequest>;

export type GetProvidersAccountsResponse = Account;
export const GetProvidersAccountsResponse = Account;

export type GetProvidersAccountsError = CommonErrors;

export const getProvidersAccounts: API.OperationMethod<GetProvidersAccountsRequest, GetProvidersAccountsResponse, GetProvidersAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProvidersAccountsRequest,
  output: GetProvidersAccountsResponse,
  errors: [],
}));

/** Lists Accounts that the provider has access to. */
export interface ListProvidersAccountsRequest {
  /** Required. The parent resource name. */
  parent: string;
  /** The maximum number of entries that are requested. The default page size is 25 and the maximum page size is 200. */
  pageSize?: number;
  /** The token for fetching the next page. */
  pageToken?: string;
}

export const ListProvidersAccountsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/providers/{providersId}/accounts" }),
  svc,
) as unknown as Schema.Schema<ListProvidersAccountsRequest>;

export type ListProvidersAccountsResponse = ListAccountsResponse;
export const ListProvidersAccountsResponse = ListAccountsResponse;

export type ListProvidersAccountsError = CommonErrors;

export const listProvidersAccounts = API.makePaginated(() => ({
  input: ListProvidersAccountsRequest,
  output: ListProvidersAccountsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Grants an approval on an Account. */
export interface ApproveProvidersAccountsRequest {
  /** Required. The resource name of the account, with the format `providers/{providerId}/accounts/{accountId}`. */
  name: string;
  /** Request body */
  body?: ApproveAccountRequest;
}

export const ApproveProvidersAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ApproveAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/providers/{providersId}/accounts/{accountsId}:approve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ApproveProvidersAccountsRequest>;

export type ApproveProvidersAccountsResponse = Empty;
export const ApproveProvidersAccountsResponse = Empty;

export type ApproveProvidersAccountsError = CommonErrors;

export const approveProvidersAccounts: API.OperationMethod<ApproveProvidersAccountsRequest, ApproveProvidersAccountsResponse, ApproveProvidersAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ApproveProvidersAccountsRequest,
  output: ApproveProvidersAccountsResponse,
  errors: [],
}));

/** Rejects an approval on an Account. */
export interface RejectProvidersAccountsRequest {
  /** Required. The resource name of the account. */
  name: string;
  /** Request body */
  body?: RejectAccountRequest;
}

export const RejectProvidersAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RejectAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/providers/{providersId}/accounts/{accountsId}:reject", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RejectProvidersAccountsRequest>;

export type RejectProvidersAccountsResponse = Empty;
export const RejectProvidersAccountsResponse = Empty;

export type RejectProvidersAccountsError = CommonErrors;

export const rejectProvidersAccounts: API.OperationMethod<RejectProvidersAccountsRequest, RejectProvidersAccountsResponse, RejectProvidersAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RejectProvidersAccountsRequest,
  output: RejectProvidersAccountsResponse,
  errors: [],
}));

/** Resets an Account and cancels all associated Entitlements. Partner can only reset accounts they own rather than customer accounts. */
export interface ResetProvidersAccountsRequest {
  /** Required. The resource name of the account. */
  name: string;
  /** Request body */
  body?: ResetAccountRequest;
}

export const ResetProvidersAccountsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ResetAccountRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/providers/{providersId}/accounts/{accountsId}:reset", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResetProvidersAccountsRequest>;

export type ResetProvidersAccountsResponse = Empty;
export const ResetProvidersAccountsResponse = Empty;

export type ResetProvidersAccountsError = CommonErrors;

export const resetProvidersAccounts: API.OperationMethod<ResetProvidersAccountsRequest, ResetProvidersAccountsResponse, ResetProvidersAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResetProvidersAccountsRequest,
  output: ResetProvidersAccountsResponse,
  errors: [],
}));

/** Gets a requested Entitlement resource. */
export interface GetProvidersEntitlementsRequest {
  /** Required. The name of the entitlement to retrieve. */
  name: string;
}

export const GetProvidersEntitlementsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/providers/{providersId}/entitlements/{entitlementsId}" }),
  svc,
) as unknown as Schema.Schema<GetProvidersEntitlementsRequest>;

export type GetProvidersEntitlementsResponse = Entitlement;
export const GetProvidersEntitlementsResponse = Entitlement;

export type GetProvidersEntitlementsError = CommonErrors;

export const getProvidersEntitlements: API.OperationMethod<GetProvidersEntitlementsRequest, GetProvidersEntitlementsResponse, GetProvidersEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProvidersEntitlementsRequest,
  output: GetProvidersEntitlementsResponse,
  errors: [],
}));

/** Updates an existing Entitlement. */
export interface PatchProvidersEntitlementsRequest {
  /** Required. The name of the entitlement to update. */
  name: string;
  /** The update mask that applies to the resource. See the [FieldMask definition] (https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask) for more details. */
  updateMask?: string;
  /** Request body */
  body?: Entitlement;
}

export const PatchProvidersEntitlementsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Entitlement).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/providers/{providersId}/entitlements/{entitlementsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProvidersEntitlementsRequest>;

export type PatchProvidersEntitlementsResponse = Entitlement;
export const PatchProvidersEntitlementsResponse = Entitlement;

export type PatchProvidersEntitlementsError = CommonErrors;

export const patchProvidersEntitlements: API.OperationMethod<PatchProvidersEntitlementsRequest, PatchProvidersEntitlementsResponse, PatchProvidersEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProvidersEntitlementsRequest,
  output: PatchProvidersEntitlementsResponse,
  errors: [],
}));

/** Lists Entitlements for which the provider has read access. */
export interface ListProvidersEntitlementsRequest {
  /** Required. The parent resource name. */
  parent: string;
  /** The filter that can be used to limit the list request. The filter is a query string that can match a selected set of attributes with string values. For example `account=E-1234-5678-ABCD-EFGH`, `state=pending_cancellation`, and `plan!=foo-plan`. Supported query attributes are * `account` * `customer_billing_account` with value in the format of: `billingAccounts/{id}` * `product_external_name` * `quote_external_name` * `offer` * `new_pending_offer` * `plan` * `newPendingPlan` or `new_pending_plan` * `state` * `services` * `consumers.project` * `change_history.new_offer` Note that the consumers and change_history.new_offer match works on repeated structures, so equality (`consumers.project=projects/123456789`) is not supported. Set membership can be expressed with the `:` operator. For example, `consumers.project:projects/123456789` finds entitlements with at least one consumer with project field equal to `projects/123456789`. `change_history.new_offer` retrieves all entitlements that were once associated or are currently active with the offer. Also note that the state name match is case-insensitive and query can omit the prefix "ENTITLEMENT_". For example, `state=active` is equivalent to `state=ENTITLEMENT_ACTIVE`. If the query contains some special characters other than letters, underscore, or digits, the phrase must be quoted with double quotes. For example, `product="providerId:productId"`, where the product name needs to be quoted because it contains special character colon. Queries can be combined with `AND`, `OR`, and `NOT` to form more complex queries. They can also be grouped to force a desired evaluation order. For example, `state=active AND (account=E-1234 OR account=5678) AND NOT (product=foo-product)`. Connective `AND` can be omitted between two predicates. For example `account=E-1234 state=active` is equivalent to `account=E-1234 AND state=active`. */
  filter?: string;
  /** The maximum number of entries that are requested. The default page size is 200. */
  pageSize?: number;
  /** The token for fetching the next page. */
  pageToken?: string;
}

export const ListProvidersEntitlementsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/providers/{providersId}/entitlements" }),
  svc,
) as unknown as Schema.Schema<ListProvidersEntitlementsRequest>;

export type ListProvidersEntitlementsResponse = ListEntitlementsResponse;
export const ListProvidersEntitlementsResponse = ListEntitlementsResponse;

export type ListProvidersEntitlementsError = CommonErrors;

export const listProvidersEntitlements = API.makePaginated(() => ({
  input: ListProvidersEntitlementsRequest,
  output: ListProvidersEntitlementsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Approves an entitlement that is in the EntitlementState.ENTITLEMENT_ACTIVATION_REQUESTED state. This method is invoked by the provider to approve the creation of the entitlement resource. */
export interface ApproveProvidersEntitlementsRequest {
  /** Required. The resource name of the entitlement, with the format `providers/{providerId}/entitlements/{entitlementId}`. */
  name: string;
  /** Request body */
  body?: ApproveEntitlementRequest;
}

export const ApproveProvidersEntitlementsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ApproveEntitlementRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/providers/{providersId}/entitlements/{entitlementsId}:approve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ApproveProvidersEntitlementsRequest>;

export type ApproveProvidersEntitlementsResponse = Empty;
export const ApproveProvidersEntitlementsResponse = Empty;

export type ApproveProvidersEntitlementsError = CommonErrors;

export const approveProvidersEntitlements: API.OperationMethod<ApproveProvidersEntitlementsRequest, ApproveProvidersEntitlementsResponse, ApproveProvidersEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ApproveProvidersEntitlementsRequest,
  output: ApproveProvidersEntitlementsResponse,
  errors: [],
}));

/** Rejects an entitlement that is in the EntitlementState.ENTITLEMENT_ACTIVATION_REQUESTED state. This method is invoked by the provider to reject the creation of the entitlement resource. */
export interface RejectProvidersEntitlementsRequest {
  /** Required. The resource name of the entitlement. */
  name: string;
  /** Request body */
  body?: RejectEntitlementRequest;
}

export const RejectProvidersEntitlementsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RejectEntitlementRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/providers/{providersId}/entitlements/{entitlementsId}:reject", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RejectProvidersEntitlementsRequest>;

export type RejectProvidersEntitlementsResponse = Empty;
export const RejectProvidersEntitlementsResponse = Empty;

export type RejectProvidersEntitlementsError = CommonErrors;

export const rejectProvidersEntitlements: API.OperationMethod<RejectProvidersEntitlementsRequest, RejectProvidersEntitlementsResponse, RejectProvidersEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RejectProvidersEntitlementsRequest,
  output: RejectProvidersEntitlementsResponse,
  errors: [],
}));

/** Approves an entitlement plan change that is in the EntitlementState.ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL state. This method is invoked by the provider to approve the plan change on the entitlement resource. */
export interface ApprovePlanChangeProvidersEntitlementsRequest {
  /** Required. The resource name of the entitlement. */
  name: string;
  /** Request body */
  body?: ApproveEntitlementPlanChangeRequest;
}

export const ApprovePlanChangeProvidersEntitlementsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ApproveEntitlementPlanChangeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/providers/{providersId}/entitlements/{entitlementsId}:approvePlanChange", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ApprovePlanChangeProvidersEntitlementsRequest>;

export type ApprovePlanChangeProvidersEntitlementsResponse = Empty;
export const ApprovePlanChangeProvidersEntitlementsResponse = Empty;

export type ApprovePlanChangeProvidersEntitlementsError = CommonErrors;

export const approvePlanChangeProvidersEntitlements: API.OperationMethod<ApprovePlanChangeProvidersEntitlementsRequest, ApprovePlanChangeProvidersEntitlementsResponse, ApprovePlanChangeProvidersEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ApprovePlanChangeProvidersEntitlementsRequest,
  output: ApprovePlanChangeProvidersEntitlementsResponse,
  errors: [],
}));

/** Rejects an entitlement plan change that is in the EntitlementState.ENTITLEMENT_PENDING_PLAN_CHANGE_APPROVAL state. This method is invoked by the provider to reject the plan change on the entitlement resource. */
export interface RejectPlanChangeProvidersEntitlementsRequest {
  /** Required. The resource name of the entitlement. */
  name: string;
  /** Request body */
  body?: RejectEntitlementPlanChangeRequest;
}

export const RejectPlanChangeProvidersEntitlementsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RejectEntitlementPlanChangeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/providers/{providersId}/entitlements/{entitlementsId}:rejectPlanChange", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RejectPlanChangeProvidersEntitlementsRequest>;

export type RejectPlanChangeProvidersEntitlementsResponse = Empty;
export const RejectPlanChangeProvidersEntitlementsResponse = Empty;

export type RejectPlanChangeProvidersEntitlementsError = CommonErrors;

export const rejectPlanChangeProvidersEntitlements: API.OperationMethod<RejectPlanChangeProvidersEntitlementsRequest, RejectPlanChangeProvidersEntitlementsResponse, RejectPlanChangeProvidersEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RejectPlanChangeProvidersEntitlementsRequest,
  output: RejectPlanChangeProvidersEntitlementsResponse,
  errors: [],
}));

/** Requests suspension of an active Entitlement. This is not yet supported. */
export interface SuspendProvidersEntitlementsRequest {
  /** Required. The name of the entitlement to suspend. */
  name: string;
  /** Request body */
  body?: SuspendEntitlementRequest;
}

export const SuspendProvidersEntitlementsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SuspendEntitlementRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/providers/{providersId}/entitlements/{entitlementsId}:suspend", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SuspendProvidersEntitlementsRequest>;

export type SuspendProvidersEntitlementsResponse = Empty;
export const SuspendProvidersEntitlementsResponse = Empty;

export type SuspendProvidersEntitlementsError = CommonErrors;

export const suspendProvidersEntitlements: API.OperationMethod<SuspendProvidersEntitlementsRequest, SuspendProvidersEntitlementsResponse, SuspendProvidersEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SuspendProvidersEntitlementsRequest,
  output: SuspendProvidersEntitlementsResponse,
  errors: [],
}));

