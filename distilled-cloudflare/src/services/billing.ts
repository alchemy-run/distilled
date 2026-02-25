/**
 * Cloudflare BILLING API
 *
 * Generated from Cloudflare TypeScript SDK.
 * DO NOT EDIT - regenerate with: bun scripts/generate-from-sdk.ts --service billing
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
// Profile
// =============================================================================

export interface GetProfileRequest {
  /** Identifier */
  accountId: string;
}

export const GetProfileRequest = Schema.Struct({
  accountId: Schema.String.pipe(T.HttpPath("account_id")),
}).pipe(
  T.Http({ method: "GET", path: "/accounts/{account_id}/billing/profile" }),
) as unknown as Schema.Schema<GetProfileRequest>;

export interface GetProfileResponse {
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

export const GetProfileResponse = Schema.Struct({
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
    accountType: "account_type",
    cardExpiryMonth: "card_expiry_month",
    cardExpiryYear: "card_expiry_year",
    cardNumber: "card_number",
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
    taxIdType: "tax_id_type",
    useLegacy: "use_legacy",
    validationCode: "validation_code",
  }),
) as unknown as Schema.Schema<GetProfileResponse>;

export const getProfile: (
  input: GetProfileRequest,
) => Effect.Effect<
  GetProfileResponse,
  CommonErrors,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProfileRequest,
  output: GetProfileResponse,
  errors: [],
}));
