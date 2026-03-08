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
) as unknown as Schema.Schema<GetProfileResponse>;

export type GetProfileError = CommonErrors;

export const getProfile: API.OperationMethod<
  GetProfileRequest,
  GetProfileResponse,
  GetProfileError,
  ApiToken | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProfileRequest,
  output: GetProfileResponse,
  errors: [],
}));
