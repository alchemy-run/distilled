// ==========================================================================
// Google Workspace Reseller API (reseller v1)
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
  name: "reseller",
  version: "v1",
  rootUrl: "https://reseller.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface RenewalSettings {
  /** Identifies the resource as a subscription renewal setting. Value: `subscriptions#renewalSettings` */
  kind?: string;
  /** Renewal settings for the annual commitment plan. For more detailed information, see renewal options in the administrator help center. When renewing a subscription, the `renewalType` is a required property. */
  renewalType?: string;
}

export const RenewalSettings: Schema.Schema<RenewalSettings> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  renewalType: Schema.optional(Schema.String),
})).annotate({ identifier: "RenewalSettings" }) as any as Schema.Schema<RenewalSettings>;

export interface Seats {
  /** Identifies the resource as a subscription seat setting. Value: `subscriptions#seats` */
  kind?: string;
  /** Read-only field containing the current number of users that are assigned a license for the product defined in `skuId`. This field's value is equivalent to the numerical count of users returned by the Enterprise License Manager API method: [`listForProductAndSku`](https://developers.google.com/workspace/admin/licensing/v1/reference/licenseAssignments/listForProductAndSku). */
  licensedNumberOfSeats?: number;
  /** This is a required property and is exclusive to subscriptions with `ANNUAL_MONTHLY_PAY` and `ANNUAL_YEARLY_PAY` plans. This property sets the maximum number of licenses assignable to users on a subscription. The reseller can add more licenses, but once set, the `numberOfSeats` cannot be reduced until renewal. The reseller is invoiced based on the `numberOfSeats` value regardless of how many of these user licenses are assigned. *Note: *Google Workspace subscriptions automatically assign a license to every user. */
  numberOfSeats?: number;
  /** This is a required property and is exclusive to subscriptions with `FLEXIBLE` or `TRIAL` plans. This property sets the maximum number of licensed users allowed on a subscription. This quantity can be increased up to the maximum limit defined in the reseller's contract. The minimum quantity is the current number of users in the customer account. *Note: *G Suite subscriptions automatically assign a license to every user. */
  maximumNumberOfSeats?: number;
}

export const Seats: Schema.Schema<Seats> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  licensedNumberOfSeats: Schema.optional(Schema.Number),
  numberOfSeats: Schema.optional(Schema.Number),
  maximumNumberOfSeats: Schema.optional(Schema.Number),
})).annotate({ identifier: "Seats" }) as any as Schema.Schema<Seats>;

export interface ChangePlanRequest {
  /** Identifies the resource as a subscription change plan request. Value: `subscriptions#changePlanRequest` */
  kind?: string;
  /** Google-issued code (100 char max) for discounted pricing on subscription plans. Deal code must be included in `changePlan` request in order to receive discounted rate. This property is optional. If a deal code has already been added to a subscription, this property may be left empty and the existing discounted rate will still apply (if not empty, only provide the deal code that is already present on the subscription). If a deal code has never been added to a subscription and this property is left blank, regular pricing will apply. */
  dealCode?: string;
  /** This is a required property. The seats property is the number of user seat licenses. */
  seats?: Seats;
  /** The `planName` property is required. This is the name of the subscription's payment plan. For more information about the Google payment plans, see API concepts. Possible values are: - `ANNUAL_MONTHLY_PAY` - The annual commitment plan with monthly payments *Caution: *`ANNUAL_MONTHLY_PAY` is returned as `ANNUAL` in all API responses. - `ANNUAL_YEARLY_PAY` - The annual commitment plan with yearly payments - `FLEXIBLE` - The flexible plan - `TRIAL` - The 30-day free trial plan */
  planName?: string;
  /** This is an optional property. This purchase order (PO) information is for resellers to use for their company tracking usage. If a `purchaseOrderId` value is given it appears in the API responses and shows up in the invoice. The property accepts up to 80 plain text characters. */
  purchaseOrderId?: string;
}

export const ChangePlanRequest: Schema.Schema<ChangePlanRequest> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  dealCode: Schema.optional(Schema.String),
  seats: Schema.optional(Seats),
  planName: Schema.optional(Schema.String),
  purchaseOrderId: Schema.optional(Schema.String),
})).annotate({ identifier: "ChangePlanRequest" }) as any as Schema.Schema<ChangePlanRequest>;

export interface PrimaryAdmin {
  /** The business email of the primary administrator of the customer. The email verification link is sent to this email address at the time of customer creation. Primary administrators have access to the customer's Admin Console, including the ability to invite and evict users and manage the administrative needs of the customer. */
  primaryEmail?: string;
}

export const PrimaryAdmin: Schema.Schema<PrimaryAdmin> = Schema.suspend(() => Schema.Struct({
  primaryEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "PrimaryAdmin" }) as any as Schema.Schema<PrimaryAdmin>;

export interface ResellernotifyGetwatchdetailsResponse {
  /** Topic name of the PubSub */
  topicName?: string;
  /** List of registered service accounts. */
  serviceAccountEmailAddresses?: Array<string>;
}

export const ResellernotifyGetwatchdetailsResponse: Schema.Schema<ResellernotifyGetwatchdetailsResponse> = Schema.suspend(() => Schema.Struct({
  topicName: Schema.optional(Schema.String),
  serviceAccountEmailAddresses: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ResellernotifyGetwatchdetailsResponse" }) as any as Schema.Schema<ResellernotifyGetwatchdetailsResponse>;

export interface Address {
  /** Identifies the resource as a customer address. Value: `customers#address` */
  kind?: string;
  /** The company or company division name. This is required. */
  organizationName?: string;
  /** The customer contact's name. This is required. */
  contactName?: string;
  /** A `postalCode` example is a postal zip code such as `94043`. This property is required when creating a new customer. */
  postalCode?: string;
  /** An example of a `locality` value is the city of `San Francisco`. */
  locality?: string;
  /** For `countryCode` information, see the ISO 3166 country code elements. Verify that country is approved for resale of Google products. This property is required when creating a new customer. */
  countryCode?: string;
  /** Line 2 of the address. */
  addressLine2?: string;
  /** A customer's physical address. An address can be composed of one to three lines. The `addressline2` and `addressLine3` are optional. */
  addressLine1?: string;
  /** An example of a `region` value is `CA` for the state of California. */
  region?: string;
  /** Line 3 of the address. */
  addressLine3?: string;
}

export const Address: Schema.Schema<Address> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  organizationName: Schema.optional(Schema.String),
  contactName: Schema.optional(Schema.String),
  postalCode: Schema.optional(Schema.String),
  locality: Schema.optional(Schema.String),
  countryCode: Schema.optional(Schema.String),
  addressLine2: Schema.optional(Schema.String),
  addressLine1: Schema.optional(Schema.String),
  region: Schema.optional(Schema.String),
  addressLine3: Schema.optional(Schema.String),
})).annotate({ identifier: "Address" }) as any as Schema.Schema<Address>;

export interface Customer {
  /** Identifies the resource as a customer. Value: `reseller#customer` */
  kind?: string;
  /** Customer contact phone number. Must start with "+" followed by the country code. The rest of the number can be contiguous numbers or respect the phone local format conventions, but it must be a real phone number and not, for example, "123". This field is silently ignored if invalid. */
  phoneNumber?: string;
  /** The customer's primary domain name string. `customerDomain` is required when creating a new customer. Do not include the `www` prefix in the domain when adding a customer. */
  customerDomain?: string;
  /** The first admin details of the customer, present in case of TEAM customer. */
  primaryAdmin?: PrimaryAdmin;
  /** URL to customer's Admin console dashboard. The read-only URL is generated by the API service. This is used if your client application requires the customer to complete a task in the Admin console. */
  resourceUiUrl?: string;
  /** Like the "Customer email" in the reseller tools, this email is the secondary contact used if something happens to the customer's service such as service outage or a security issue. This property is required when creating a new "domain" customer and should not use the same domain as `customerDomain`. The `alternateEmail` field is not necessary to create a "team" customer. */
  alternateEmail?: string;
  /** This property will always be returned in a response as the unique identifier generated by Google. In a request, this property can be either the primary domain or the unique identifier generated by Google. */
  customerId?: string;
  /** A customer's address information. Each field has a limit of 255 charcters. */
  postalAddress?: Address;
  /** Whether the customer's primary domain has been verified. */
  customerDomainVerified?: boolean;
  /** Identifies the type of the customer. Acceptable values include: * `domain`: Implies a domain-verified customer (default). * `team`: Implies an email-verified customer. For more information, see [managed teams](https://support.google.com/a/users/answer/9939479). */
  customerType?: "customerTypeUnspecified" | "domain" | "team" | (string & {});
}

export const Customer: Schema.Schema<Customer> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
  customerDomain: Schema.optional(Schema.String),
  primaryAdmin: Schema.optional(PrimaryAdmin),
  resourceUiUrl: Schema.optional(Schema.String),
  alternateEmail: Schema.optional(Schema.String),
  customerId: Schema.optional(Schema.String),
  postalAddress: Schema.optional(Address),
  customerDomainVerified: Schema.optional(Schema.Boolean),
  customerType: Schema.optional(Schema.String),
})).annotate({ identifier: "Customer" }) as any as Schema.Schema<Customer>;

export interface Subscription {
  /** This is a required property. The number and limit of user seat licenses in the plan. */
  seats?: Seats;
  /** Identifies the resource as a Subscription. Value: `reseller#subscription` */
  kind?: string;
  /** Renewal settings for the annual commitment plan. For more detailed information, see renewal options in the administrator help center. */
  renewalSettings?: RenewalSettings;
  /** Read-only field that returns the current billing method for a subscription. */
  billingMethod?: string;
  /** Google-issued code (100 char max) for discounted pricing on subscription plans. Deal code must be included in `insert` requests in order to receive discounted rate. This property is optional, regular pricing applies if left empty. */
  dealCode?: string;
  /** This is an optional property. This purchase order (PO) information is for resellers to use for their company tracking usage. If a `purchaseOrderId` value is given it appears in the API responses and shows up in the invoice. The property accepts up to 80 plain text characters. */
  purchaseOrderId?: string;
  /** The G Suite annual commitment and flexible payment plans can be in a 30-day free trial. For more information, see the API concepts. */
  trialSettings?: { isInTrial?: boolean; trialEndTime?: string };
  /** This property will always be returned in a response as the unique identifier generated by Google. In a request, this property can be either the primary domain or the unique identifier generated by Google. */
  customerId?: string;
  /** Primary domain name of the customer */
  customerDomain?: string;
  /** Read-only external display name for a product's SKU assigned to a customer in the subscription. SKU names are subject to change at Google's discretion. For products and SKUs available in this version of the API, see Product and SKU IDs. */
  skuName?: string;
  /** Read-only field containing an enumerable of all the current suspension reasons for a subscription. It is possible for a subscription to have many concurrent, overlapping suspension reasons. A subscription's `STATUS` is `SUSPENDED` until all pending suspensions are removed. Possible options include: - `PENDING_TOS_ACCEPTANCE` - The customer has not logged in and accepted the G Suite Resold Terms of Services. - `RENEWAL_WITH_TYPE_CANCEL` - The customer's commitment ended and their service was cancelled at the end of their term. - `RESELLER_INITIATED` - A manual suspension invoked by a Reseller. - `TRIAL_ENDED` - The customer's trial expired without a plan selected. - `OTHER` - The customer is suspended for an internal Google reason (e.g. abuse or otherwise). */
  suspensionReasons?: Array<string>;
  /** The `creationTime` property is the date when subscription was created. It is in milliseconds using the Epoch format. See an example Epoch converter. */
  creationTime?: string;
  /** URL to customer's Subscriptions page in the Admin console. The read-only URL is generated by the API service. This is used if your client application requires the customer to complete a task using the Subscriptions page in the Admin console. */
  resourceUiUrl?: string;
  /** Read-only transfer related information for the subscription. For more information, see retrieve transferable subscriptions for a customer. */
  transferInfo?: { transferabilityExpirationTime?: string; minimumTransferableSeats?: number; currentLegacySkuId?: string };
  /** A required property. The `skuId` is a unique system identifier for a product's SKU assigned to a customer in the subscription. For products and SKUs available in this version of the API, see Product and SKU IDs. */
  skuId?: string;
  /** The `plan` property is required. In this version of the API, the G Suite plans are the flexible plan, annual commitment plan, and the 30-day free trial plan. For more information about the API"s payment plans, see the API concepts. */
  plan?: { isCommitmentPlan?: boolean; commitmentInterval?: { endTime?: string; startTime?: string }; planName?: string };
  /** The `subscriptionId` is the subscription identifier and is unique for each customer. This is a required property. Since a `subscriptionId` changes when a subscription is updated, we recommend not using this ID as a key for persistent data. Use the `subscriptionId` as described in retrieve all reseller subscriptions. */
  subscriptionId?: string;
  /** This is an optional property. */
  status?: string;
}

export const Subscription: Schema.Schema<Subscription> = Schema.suspend(() => Schema.Struct({
  seats: Schema.optional(Seats),
  kind: Schema.optional(Schema.String),
  renewalSettings: Schema.optional(RenewalSettings),
  billingMethod: Schema.optional(Schema.String),
  dealCode: Schema.optional(Schema.String),
  purchaseOrderId: Schema.optional(Schema.String),
  trialSettings: Schema.optional(Schema.Struct({ isInTrial: Schema.optional(Schema.Boolean), trialEndTime: Schema.optional(Schema.String) })),
  customerId: Schema.optional(Schema.String),
  customerDomain: Schema.optional(Schema.String),
  skuName: Schema.optional(Schema.String),
  suspensionReasons: Schema.optional(Schema.Array(Schema.String)),
  creationTime: Schema.optional(Schema.String),
  resourceUiUrl: Schema.optional(Schema.String),
  transferInfo: Schema.optional(Schema.Struct({ transferabilityExpirationTime: Schema.optional(Schema.String), minimumTransferableSeats: Schema.optional(Schema.Number), currentLegacySkuId: Schema.optional(Schema.String) })),
  skuId: Schema.optional(Schema.String),
  plan: Schema.optional(Schema.Struct({ isCommitmentPlan: Schema.optional(Schema.Boolean), commitmentInterval: Schema.optional(Schema.Struct({ endTime: Schema.optional(Schema.String), startTime: Schema.optional(Schema.String) })), planName: Schema.optional(Schema.String) })),
  subscriptionId: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
})).annotate({ identifier: "Subscription" }) as any as Schema.Schema<Subscription>;

export interface Subscriptions {
  /** Identifies the resource as a collection of subscriptions. Value: reseller#subscriptions */
  kind?: string;
  /** The subscriptions in this page of results. */
  subscriptions?: Array<Subscription>;
  /** The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. */
  nextPageToken?: string;
}

export const Subscriptions: Schema.Schema<Subscriptions> = Schema.suspend(() => Schema.Struct({
  kind: Schema.optional(Schema.String),
  subscriptions: Schema.optional(Schema.Array(Subscription)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "Subscriptions" }) as any as Schema.Schema<Subscriptions>;

export interface ResellernotifyResource {
  /** Topic name of the PubSub */
  topicName?: string;
}

export const ResellernotifyResource: Schema.Schema<ResellernotifyResource> = Schema.suspend(() => Schema.Struct({
  topicName: Schema.optional(Schema.String),
})).annotate({ identifier: "ResellernotifyResource" }) as any as Schema.Schema<ResellernotifyResource>;

// ==========================================================================
// Operations
// ==========================================================================

/** Unregisters a Reseller for receiving notifications. */
export interface UnregisterResellernotifyRequest {
  /** The service account which owns the Cloud-PubSub topic. */
  serviceAccountEmailAddress?: string;
}

export const UnregisterResellernotifyRequest = Schema.Struct({
  serviceAccountEmailAddress: Schema.optional(Schema.String).pipe(T.HttpQuery("serviceAccountEmailAddress")),
}).pipe(
  T.Http({ method: "POST", path: "apps/reseller/v1/resellernotify/unregister", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnregisterResellernotifyRequest>;

export type UnregisterResellernotifyResponse = ResellernotifyResource;
export const UnregisterResellernotifyResponse = ResellernotifyResource;

export type UnregisterResellernotifyError = CommonErrors;

export const unregisterResellernotify: API.OperationMethod<UnregisterResellernotifyRequest, UnregisterResellernotifyResponse, UnregisterResellernotifyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnregisterResellernotifyRequest,
  output: UnregisterResellernotifyResponse,
  errors: [],
}));

/** Registers a Reseller for receiving notifications. */
export interface RegisterResellernotifyRequest {
  /** The service account which will own the created Cloud-PubSub topic. */
  serviceAccountEmailAddress?: string;
}

export const RegisterResellernotifyRequest = Schema.Struct({
  serviceAccountEmailAddress: Schema.optional(Schema.String).pipe(T.HttpQuery("serviceAccountEmailAddress")),
}).pipe(
  T.Http({ method: "POST", path: "apps/reseller/v1/resellernotify/register", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RegisterResellernotifyRequest>;

export type RegisterResellernotifyResponse = ResellernotifyResource;
export const RegisterResellernotifyResponse = ResellernotifyResource;

export type RegisterResellernotifyError = CommonErrors;

export const registerResellernotify: API.OperationMethod<RegisterResellernotifyRequest, RegisterResellernotifyResponse, RegisterResellernotifyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RegisterResellernotifyRequest,
  output: RegisterResellernotifyResponse,
  errors: [],
}));

/** Returns all the details of the watch corresponding to the reseller. */
export interface GetwatchdetailsResellernotifyRequest {
}

export const GetwatchdetailsResellernotifyRequest = Schema.Struct({
}).pipe(
  T.Http({ method: "GET", path: "apps/reseller/v1/resellernotify/getwatchdetails" }),
  svc,
) as unknown as Schema.Schema<GetwatchdetailsResellernotifyRequest>;

export type GetwatchdetailsResellernotifyResponse = ResellernotifyGetwatchdetailsResponse;
export const GetwatchdetailsResellernotifyResponse = ResellernotifyGetwatchdetailsResponse;

export type GetwatchdetailsResellernotifyError = CommonErrors;

export const getwatchdetailsResellernotify: API.OperationMethod<GetwatchdetailsResellernotifyRequest, GetwatchdetailsResellernotifyResponse, GetwatchdetailsResellernotifyError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetwatchdetailsResellernotifyRequest,
  output: GetwatchdetailsResellernotifyResponse,
  errors: [],
}));

/** Lists of subscriptions managed by the reseller. The list can be all subscriptions, all of a customer's subscriptions, or all of a customer's transferable subscriptions. Optionally, this method can filter the response by a `customerNamePrefix`. For more information, see [manage subscriptions](https://developers.google.com/workspace/admin/reseller/v1/how-tos/manage_subscriptions). */
export interface ListSubscriptionsRequest {
  /** The `customerAuthToken` query string is required when creating a resold account that transfers a direct customer's subscription or transfers another reseller customer's subscription to your reseller management. This is a hexadecimal authentication token needed to complete the subscription transfer. For more information, see the administrator help center. */
  customerAuthToken?: string;
  /** Token to specify next page in the list */
  pageToken?: string;
  /** When retrieving a large list, the `maxResults` is the maximum number of results per page. The `nextPageToken` value takes you to the next page. The default is 20. */
  maxResults?: number;
  /** When retrieving all of your subscriptions and filtering for specific customers, you can enter a prefix for a customer name. Using an example customer group that includes `exam.com`, `example20.com` and `example.com`: - `exa` -- Returns all customer names that start with 'exa' which could include `exam.com`, `example20.com`, and `example.com`. A name prefix is similar to using a regular expression's asterisk, exa*. - `example` -- Returns `example20.com` and `example.com`. */
  customerNamePrefix?: string;
  /** This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable. */
  customerId?: string;
}

export const ListSubscriptionsRequest = Schema.Struct({
  customerAuthToken: Schema.optional(Schema.String).pipe(T.HttpQuery("customerAuthToken")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  customerNamePrefix: Schema.optional(Schema.String).pipe(T.HttpQuery("customerNamePrefix")),
  customerId: Schema.optional(Schema.String).pipe(T.HttpQuery("customerId")),
}).pipe(
  T.Http({ method: "GET", path: "apps/reseller/v1/subscriptions" }),
  svc,
) as unknown as Schema.Schema<ListSubscriptionsRequest>;

export type ListSubscriptionsResponse = Subscriptions;
export const ListSubscriptionsResponse = Subscriptions;

export type ListSubscriptionsError = CommonErrors;

export const listSubscriptions = API.makePaginated(() => ({
  input: ListSubscriptionsRequest,
  output: ListSubscriptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Suspends an active subscription. You can use this method to suspend a paid subscription that is currently in the `ACTIVE` state. * For `FLEXIBLE` subscriptions, billing is paused. * For `ANNUAL_MONTHLY_PAY` or `ANNUAL_YEARLY_PAY` subscriptions: * Suspending the subscription does not change the renewal date that was originally committed to. * A suspended subscription does not renew. If you activate the subscription after the original renewal date, a new annual subscription will be created, starting on the day of activation. We strongly encourage you to suspend subscriptions only for short periods of time as suspensions over 60 days may result in the subscription being cancelled. */
export interface SuspendSubscriptionsRequest {
  /** This is a required property. The `subscriptionId` is the subscription identifier and is unique for each customer. Since a `subscriptionId` changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the `subscriptionId` can be found using the retrieve all reseller subscriptions method. */
  subscriptionId: string;
  /** This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable. */
  customerId: string;
}

export const SuspendSubscriptionsRequest = Schema.Struct({
  subscriptionId: Schema.String.pipe(T.HttpPath("subscriptionId")),
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
}).pipe(
  T.Http({ method: "POST", path: "apps/reseller/v1/customers/{customerId}/subscriptions/{subscriptionId}/suspend", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SuspendSubscriptionsRequest>;

export type SuspendSubscriptionsResponse = Subscription;
export const SuspendSubscriptionsResponse = Subscription;

export type SuspendSubscriptionsError = CommonErrors;

export const suspendSubscriptions: API.OperationMethod<SuspendSubscriptionsRequest, SuspendSubscriptionsResponse, SuspendSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SuspendSubscriptionsRequest,
  output: SuspendSubscriptionsResponse,
  errors: [],
}));

/** Updates a user license's renewal settings. This is applicable for accounts with annual commitment plans only. For more information, see the description in [manage subscriptions](https://developers.google.com/workspace/admin/reseller/v1/how-tos/manage_subscriptions#update_renewal). */
export interface ChangeRenewalSettingsSubscriptionsRequest {
  /** This is a required property. The `subscriptionId` is the subscription identifier and is unique for each customer. Since a `subscriptionId` changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the `subscriptionId` can be found using the retrieve all reseller subscriptions method. */
  subscriptionId: string;
  /** This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable. */
  customerId: string;
  /** Request body */
  body?: RenewalSettings;
}

export const ChangeRenewalSettingsSubscriptionsRequest = Schema.Struct({
  subscriptionId: Schema.String.pipe(T.HttpPath("subscriptionId")),
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  body: Schema.optional(RenewalSettings).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "apps/reseller/v1/customers/{customerId}/subscriptions/{subscriptionId}/changeRenewalSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ChangeRenewalSettingsSubscriptionsRequest>;

export type ChangeRenewalSettingsSubscriptionsResponse = Subscription;
export const ChangeRenewalSettingsSubscriptionsResponse = Subscription;

export type ChangeRenewalSettingsSubscriptionsError = CommonErrors;

export const changeRenewalSettingsSubscriptions: API.OperationMethod<ChangeRenewalSettingsSubscriptionsRequest, ChangeRenewalSettingsSubscriptionsResponse, ChangeRenewalSettingsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ChangeRenewalSettingsSubscriptionsRequest,
  output: ChangeRenewalSettingsSubscriptionsResponse,
  errors: [],
}));

/** Cancels, suspends, or transfers a subscription to direct. */
export interface DeleteSubscriptionsRequest {
  /** The `deletionType` query string enables the cancellation, downgrade, or suspension of a subscription. */
  deletionType: "deletion_type_undefined" | "cancel" | "transfer_to_direct" | (string & {});
  /** This is a required property. The `subscriptionId` is the subscription identifier and is unique for each customer. Since a `subscriptionId` changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the `subscriptionId` can be found using the retrieve all reseller subscriptions method. */
  subscriptionId: string;
  /** This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable. */
  customerId: string;
}

export const DeleteSubscriptionsRequest = Schema.Struct({
  deletionType: Schema.String.pipe(T.HttpQuery("deletionType")),
  subscriptionId: Schema.String.pipe(T.HttpPath("subscriptionId")),
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
}).pipe(
  T.Http({ method: "DELETE", path: "apps/reseller/v1/customers/{customerId}/subscriptions/{subscriptionId}" }),
  svc,
) as unknown as Schema.Schema<DeleteSubscriptionsRequest>;

export interface DeleteSubscriptionsResponse {}
export const DeleteSubscriptionsResponse: Schema.Schema<DeleteSubscriptionsResponse> = Schema.Struct({}) as any as Schema.Schema<DeleteSubscriptionsResponse>;

export type DeleteSubscriptionsError = CommonErrors;

export const deleteSubscriptions: API.OperationMethod<DeleteSubscriptionsRequest, DeleteSubscriptionsResponse, DeleteSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteSubscriptionsRequest,
  output: DeleteSubscriptionsResponse,
  errors: [],
}));

/** Activates a subscription previously suspended by the reseller. If you did not suspend the customer subscription and it is suspended for any other reason, such as for abuse or a pending ToS acceptance, this call will not reactivate the customer subscription. */
export interface ActivateSubscriptionsRequest {
  /** This is a required property. The `subscriptionId` is the subscription identifier and is unique for each customer. Since a `subscriptionId` changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the `subscriptionId` can be found using the retrieve all reseller subscriptions method. */
  subscriptionId: string;
  /** This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable. */
  customerId: string;
}

export const ActivateSubscriptionsRequest = Schema.Struct({
  subscriptionId: Schema.String.pipe(T.HttpPath("subscriptionId")),
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
}).pipe(
  T.Http({ method: "POST", path: "apps/reseller/v1/customers/{customerId}/subscriptions/{subscriptionId}/activate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ActivateSubscriptionsRequest>;

export type ActivateSubscriptionsResponse = Subscription;
export const ActivateSubscriptionsResponse = Subscription;

export type ActivateSubscriptionsError = CommonErrors;

export const activateSubscriptions: API.OperationMethod<ActivateSubscriptionsRequest, ActivateSubscriptionsResponse, ActivateSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ActivateSubscriptionsRequest,
  output: ActivateSubscriptionsResponse,
  errors: [],
}));

/** Immediately move a 30-day free trial subscription to a paid service subscription. This method is only applicable if a payment plan has already been set up for the 30-day trial subscription. For more information, see [manage subscriptions](https://developers.google.com/workspace/admin/reseller/v1/how-tos/manage_subscriptions#paid_service). */
export interface StartPaidServiceSubscriptionsRequest {
  /** This is a required property. The `subscriptionId` is the subscription identifier and is unique for each customer. Since a `subscriptionId` changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the `subscriptionId` can be found using the retrieve all reseller subscriptions method. */
  subscriptionId: string;
  /** This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable. */
  customerId: string;
}

export const StartPaidServiceSubscriptionsRequest = Schema.Struct({
  subscriptionId: Schema.String.pipe(T.HttpPath("subscriptionId")),
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
}).pipe(
  T.Http({ method: "POST", path: "apps/reseller/v1/customers/{customerId}/subscriptions/{subscriptionId}/startPaidService", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StartPaidServiceSubscriptionsRequest>;

export type StartPaidServiceSubscriptionsResponse = Subscription;
export const StartPaidServiceSubscriptionsResponse = Subscription;

export type StartPaidServiceSubscriptionsError = CommonErrors;

export const startPaidServiceSubscriptions: API.OperationMethod<StartPaidServiceSubscriptionsRequest, StartPaidServiceSubscriptionsResponse, StartPaidServiceSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StartPaidServiceSubscriptionsRequest,
  output: StartPaidServiceSubscriptionsResponse,
  errors: [],
}));

/** Updates a subscription's user license settings. For more information about updating an annual commitment plan or a flexible plan subscription’s licenses, see [Manage Subscriptions](https://developers.google.com/workspace/admin/reseller/v1/how-tos/manage_subscriptions#update_subscription_seat). */
export interface ChangeSeatsSubscriptionsRequest {
  /** This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable. */
  customerId: string;
  /** This is a required property. The `subscriptionId` is the subscription identifier and is unique for each customer. Since a `subscriptionId` changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the `subscriptionId` can be found using the retrieve all reseller subscriptions method. */
  subscriptionId: string;
  /** Request body */
  body?: Seats;
}

export const ChangeSeatsSubscriptionsRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  subscriptionId: Schema.String.pipe(T.HttpPath("subscriptionId")),
  body: Schema.optional(Seats).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "apps/reseller/v1/customers/{customerId}/subscriptions/{subscriptionId}/changeSeats", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ChangeSeatsSubscriptionsRequest>;

export type ChangeSeatsSubscriptionsResponse = Subscription;
export const ChangeSeatsSubscriptionsResponse = Subscription;

export type ChangeSeatsSubscriptionsError = CommonErrors;

export const changeSeatsSubscriptions: API.OperationMethod<ChangeSeatsSubscriptionsRequest, ChangeSeatsSubscriptionsResponse, ChangeSeatsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ChangeSeatsSubscriptionsRequest,
  output: ChangeSeatsSubscriptionsResponse,
  errors: [],
}));

/** Updates a subscription plan. Use this method to update a plan for a 30-day trial or a flexible plan subscription to an annual commitment plan with monthly or yearly payments. How a plan is updated differs depending on the plan and the products. For more information, see the description in [manage subscriptions](https://developers.google.com/workspace/admin/reseller/v1/how-tos/manage_subscriptions#update_subscription_plan). */
export interface ChangePlanSubscriptionsRequest {
  /** This is a required property. The `subscriptionId` is the subscription identifier and is unique for each customer. Since a `subscriptionId` changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the `subscriptionId` can be found using the retrieve all reseller subscriptions method. */
  subscriptionId: string;
  /** This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable. */
  customerId: string;
  /** Request body */
  body?: ChangePlanRequest;
}

export const ChangePlanSubscriptionsRequest = Schema.Struct({
  subscriptionId: Schema.String.pipe(T.HttpPath("subscriptionId")),
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  body: Schema.optional(ChangePlanRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "apps/reseller/v1/customers/{customerId}/subscriptions/{subscriptionId}/changePlan", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ChangePlanSubscriptionsRequest>;

export type ChangePlanSubscriptionsResponse = Subscription;
export const ChangePlanSubscriptionsResponse = Subscription;

export type ChangePlanSubscriptionsError = CommonErrors;

export const changePlanSubscriptions: API.OperationMethod<ChangePlanSubscriptionsRequest, ChangePlanSubscriptionsResponse, ChangePlanSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ChangePlanSubscriptionsRequest,
  output: ChangePlanSubscriptionsResponse,
  errors: [],
}));

/** Creates or transfer a subscription. Create a subscription for a customer's account that you ordered using the [Order a new customer account](https://developers.google.com/workspace/admin/reseller/v1/reference/customers/insert.html) method. For more information about creating a subscription for different payment plans, see [manage subscriptions](https://developers.google.com/workspace/admin/reseller/v1/how-tos/manage_subscriptions#create_subscription).\ If you did not order the customer's account using the customer insert method, use the customer's `customerAuthToken` when creating a subscription for that customer. If transferring a G Suite subscription with an associated Google Drive or Google Vault subscription, use the [batch operation](https://developers.google.com/workspace/admin/reseller/v1/how-tos/batch.html) to transfer all of these subscriptions. For more information, see how to [transfer subscriptions](https://developers.google.com/workspace/admin/reseller/v1/how-tos/manage_subscriptions#transfer_a_subscription). */
export interface InsertSubscriptionsRequest {
  /** The sku_id of the existing subscription to be upgraded or downgraded. This is required when action is SWITCH. */
  sourceSkuId?: string;
  /** The `customerAuthToken` query string is required when creating a resold account that transfers a direct customer's subscription or transfers another reseller customer's subscription to your reseller management. This is a hexadecimal authentication token needed to complete the subscription transfer. For more information, see the administrator help center. */
  customerAuthToken?: string;
  /** This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable. */
  customerId: string;
  /** The intented insert action. Advised to set this when the customer already has a subscription for a different SKU in the same product. */
  action?: "actionUnspecified" | "buy" | "switch" | (string & {});
  /** Request body */
  body?: Subscription;
}

export const InsertSubscriptionsRequest = Schema.Struct({
  sourceSkuId: Schema.optional(Schema.String).pipe(T.HttpQuery("sourceSkuId")),
  customerAuthToken: Schema.optional(Schema.String).pipe(T.HttpQuery("customerAuthToken")),
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  action: Schema.optional(Schema.String).pipe(T.HttpQuery("action")),
  body: Schema.optional(Subscription).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "apps/reseller/v1/customers/{customerId}/subscriptions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertSubscriptionsRequest>;

export type InsertSubscriptionsResponse = Subscription;
export const InsertSubscriptionsResponse = Subscription;

export type InsertSubscriptionsError = CommonErrors;

export const insertSubscriptions: API.OperationMethod<InsertSubscriptionsRequest, InsertSubscriptionsResponse, InsertSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertSubscriptionsRequest,
  output: InsertSubscriptionsResponse,
  errors: [],
}));

/** Gets a specific subscription. The `subscriptionId` can be found using the [Retrieve all reseller subscriptions](https://developers.google.com/workspace/admin/reseller/v1/how-tos/manage_subscriptions#get_all_subscriptions) method. For more information about retrieving a specific subscription, see the information descrived in [manage subscriptions](https://developers.google.com/workspace/admin/reseller/v1/how-tos/manage_subscriptions#get_subscription). */
export interface GetSubscriptionsRequest {
  /** This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable. */
  customerId: string;
  /** This is a required property. The `subscriptionId` is the subscription identifier and is unique for each customer. Since a `subscriptionId` changes when a subscription is updated, we recommend to not use this ID as a key for persistent data. And the `subscriptionId` can be found using the retrieve all reseller subscriptions method. */
  subscriptionId: string;
}

export const GetSubscriptionsRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  subscriptionId: Schema.String.pipe(T.HttpPath("subscriptionId")),
}).pipe(
  T.Http({ method: "GET", path: "apps/reseller/v1/customers/{customerId}/subscriptions/{subscriptionId}" }),
  svc,
) as unknown as Schema.Schema<GetSubscriptionsRequest>;

export type GetSubscriptionsResponse = Subscription;
export const GetSubscriptionsResponse = Subscription;

export type GetSubscriptionsError = CommonErrors;

export const getSubscriptions: API.OperationMethod<GetSubscriptionsRequest, GetSubscriptionsResponse, GetSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSubscriptionsRequest,
  output: GetSubscriptionsResponse,
  errors: [],
}));

/** Updates a customer account's settings. This method supports patch semantics. You cannot update `customerType` via the Reseller API, but a `"team"` customer can verify their domain and become `customerType = "domain"`. For more information, see [Verify your domain to unlock Essentials features](https://support.google.com/a/answer/9122284). */
export interface PatchCustomersRequest {
  /** This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable. */
  customerId: string;
  /** Request body */
  body?: Customer;
}

export const PatchCustomersRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  body: Schema.optional(Customer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "apps/reseller/v1/customers/{customerId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchCustomersRequest>;

export type PatchCustomersResponse = Customer;
export const PatchCustomersResponse = Customer;

export type PatchCustomersError = CommonErrors;

export const patchCustomers: API.OperationMethod<PatchCustomersRequest, PatchCustomersResponse, PatchCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchCustomersRequest,
  output: PatchCustomersResponse,
  errors: [],
}));

/** Gets a customer account. Use this operation to see a customer account already in your reseller management, or to see the minimal account information for an existing customer that you do not manage. For more information about the API response for existing customers, see [retrieving a customer account](https://developers.google.com/workspace/admin/reseller/v1/how-tos/manage_customers#get_customer). */
export interface GetCustomersRequest {
  /** This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable. */
  customerId: string;
}

export const GetCustomersRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
}).pipe(
  T.Http({ method: "GET", path: "apps/reseller/v1/customers/{customerId}" }),
  svc,
) as unknown as Schema.Schema<GetCustomersRequest>;

export type GetCustomersResponse = Customer;
export const GetCustomersResponse = Customer;

export type GetCustomersError = CommonErrors;

export const getCustomers: API.OperationMethod<GetCustomersRequest, GetCustomersResponse, GetCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCustomersRequest,
  output: GetCustomersResponse,
  errors: [],
}));

/** Orders a new customer's account. Before ordering a new customer account, establish whether the customer account already exists using the [`customers.get`](https://developers.google.com/workspace/admin/reseller/v1/reference/customers/get) If the customer account exists as a direct Google account or as a resold customer account from another reseller, use the `customerAuthToken\` as described in [order a resold account for an existing customer](https://developers.google.com/workspace/admin/reseller/v1/how-tos/manage_customers#create_existing_customer). For more information about ordering a new customer account, see [order a new customer account](https://developers.google.com/workspace/admin/reseller/v1/how-tos/manage_customers#create_customer). After creating a new customer account, you must provision a user as an administrator. The customer's administrator is required to sign in to the Admin console and sign the G Suite via Reseller agreement to activate the account. Resellers are prohibited from signing the G Suite via Reseller agreement on the customer's behalf. For more information, see [order a new customer account](https://developers.google.com/workspace/admin/reseller/v1/how-tos/manage_customers#tos). */
export interface InsertCustomersRequest {
  /** The `customerAuthToken` query string is required when creating a resold account that transfers a direct customer's subscription or transfers another reseller customer's subscription to your reseller management. This is a hexadecimal authentication token needed to complete the subscription transfer. For more information, see the administrator help center. */
  customerAuthToken?: string;
  /** Request body */
  body?: Customer;
}

export const InsertCustomersRequest = Schema.Struct({
  customerAuthToken: Schema.optional(Schema.String).pipe(T.HttpQuery("customerAuthToken")),
  body: Schema.optional(Customer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "apps/reseller/v1/customers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<InsertCustomersRequest>;

export type InsertCustomersResponse = Customer;
export const InsertCustomersResponse = Customer;

export type InsertCustomersError = CommonErrors;

export const insertCustomers: API.OperationMethod<InsertCustomersRequest, InsertCustomersResponse, InsertCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: InsertCustomersRequest,
  output: InsertCustomersResponse,
  errors: [],
}));

/** Updates a customer account's settings. You cannot update `customerType` via the Reseller API, but a `"team"` customer can verify their domain and become `customerType = "domain"`. For more information, see [update a customer's settings](https://developers.google.com/workspace/admin/reseller/v1/how-tos/manage_customers#update_customer). */
export interface UpdateCustomersRequest {
  /** This can be either the customer's primary domain name or the customer's unique identifier. If the domain name for a customer changes, the old domain name cannot be used to access the customer, but the customer's unique identifier (as returned by the API) can always be used. We recommend storing the unique identifier in your systems where applicable. */
  customerId: string;
  /** Request body */
  body?: Customer;
}

export const UpdateCustomersRequest = Schema.Struct({
  customerId: Schema.String.pipe(T.HttpPath("customerId")),
  body: Schema.optional(Customer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "apps/reseller/v1/customers/{customerId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCustomersRequest>;

export type UpdateCustomersResponse = Customer;
export const UpdateCustomersResponse = Customer;

export type UpdateCustomersError = CommonErrors;

export const updateCustomers: API.OperationMethod<UpdateCustomersRequest, UpdateCustomersResponse, UpdateCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateCustomersRequest,
  output: UpdateCustomersResponse,
  errors: [],
}));

