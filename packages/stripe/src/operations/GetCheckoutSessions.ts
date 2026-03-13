import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveNullableString } from "../sensitive";

// Input Schema
export const GetCheckoutSessionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.optional(Schema.String),
    customer: Schema.optional(Schema.String),
    customer_account: Schema.optional(Schema.String),
    customer_details: Schema.optional(Schema.String),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    payment_intent: Schema.optional(Schema.String),
    payment_link: Schema.optional(Schema.String),
    starting_after: Schema.optional(Schema.String),
    status: Schema.optional(Schema.Literals(["complete", "expired", "open"])),
    subscription: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/checkout/sessions",
      contentType: "form-urlencoded",
    }),
  );
export type GetCheckoutSessionsInput = typeof GetCheckoutSessionsInput.Type;

// Output Schema
export const GetCheckoutSessionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        adaptive_pricing: Schema.Unknown,
        after_expiration: Schema.Unknown,
        allow_promotion_codes: Schema.NullOr(Schema.Boolean),
        amount_subtotal: Schema.NullOr(Schema.Number),
        amount_total: Schema.NullOr(Schema.Number),
        automatic_tax: Schema.Struct({
          enabled: Schema.Boolean,
          liability: Schema.Unknown,
          provider: Schema.NullOr(Schema.String),
          status: Schema.NullOr(
            Schema.Literals(["complete", "failed", "requires_location_inputs"]),
          ),
        }),
        billing_address_collection: Schema.NullOr(
          Schema.Literals(["auto", "required"]),
        ),
        branding_settings: Schema.optional(
          Schema.Struct({
            background_color: Schema.String,
            border_style: Schema.Literals(["pill", "rectangular", "rounded"]),
            button_color: Schema.String,
            display_name: Schema.String,
            font_family: Schema.String,
            icon: Schema.Unknown,
            logo: Schema.Unknown,
          }),
        ),
        cancel_url: Schema.NullOr(Schema.String),
        client_reference_id: Schema.NullOr(Schema.String),
        client_secret: SensitiveNullableString,
        collected_information: Schema.Unknown,
        consent: Schema.Unknown,
        consent_collection: Schema.Unknown,
        created: Schema.Number,
        currency: Schema.NullOr(Schema.String),
        currency_conversion: Schema.Unknown,
        custom_fields: Schema.Array(
          Schema.Struct({
            dropdown: Schema.optional(
              Schema.Struct({
                default_value: Schema.NullOr(Schema.String),
                options: Schema.Array(
                  Schema.Struct({
                    label: Schema.String,
                    value: Schema.String,
                  }),
                ),
                value: Schema.NullOr(Schema.String),
              }),
            ),
            key: Schema.String,
            label: Schema.Struct({
              custom: Schema.NullOr(Schema.String),
              type: Schema.Literals(["custom"]),
            }),
            numeric: Schema.optional(
              Schema.Struct({
                default_value: Schema.NullOr(Schema.String),
                maximum_length: Schema.NullOr(Schema.Number),
                minimum_length: Schema.NullOr(Schema.Number),
                value: Schema.NullOr(Schema.String),
              }),
            ),
            optional: Schema.Boolean,
            text: Schema.optional(
              Schema.Struct({
                default_value: Schema.NullOr(Schema.String),
                maximum_length: Schema.NullOr(Schema.Number),
                minimum_length: Schema.NullOr(Schema.Number),
                value: Schema.NullOr(Schema.String),
              }),
            ),
            type: Schema.Literals(["dropdown", "numeric", "text"]),
          }),
        ),
        custom_text: Schema.Struct({
          after_submit: Schema.Unknown,
          shipping_address: Schema.Unknown,
          submit: Schema.Unknown,
          terms_of_service_acceptance: Schema.Unknown,
        }),
        customer: Schema.Unknown,
        customer_account: Schema.NullOr(Schema.String),
        customer_creation: Schema.NullOr(
          Schema.Literals(["always", "if_required"]),
        ),
        customer_details: Schema.Unknown,
        customer_email: Schema.NullOr(Schema.String),
        discounts: Schema.NullOr(
          Schema.Array(
            Schema.Struct({
              coupon: Schema.Unknown,
              promotion_code: Schema.Unknown,
            }),
          ),
        ),
        excluded_payment_method_types: Schema.optional(
          Schema.Array(Schema.String),
        ),
        expires_at: Schema.Number,
        id: Schema.String,
        invoice: Schema.Unknown,
        invoice_creation: Schema.Unknown,
        line_items: Schema.optional(
          Schema.Struct({
            data: Schema.Array(
              Schema.Struct({
                adjustable_quantity: Schema.Unknown,
                amount_discount: Schema.Number,
                amount_subtotal: Schema.Number,
                amount_tax: Schema.Number,
                amount_total: Schema.Number,
                currency: Schema.String,
                description: Schema.NullOr(Schema.String),
                discounts: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      amount: Schema.Number,
                      discount: Schema.Struct({
                        checkout_session: Schema.NullOr(Schema.String),
                        customer: Schema.Unknown,
                        customer_account: Schema.NullOr(Schema.String),
                        end: Schema.NullOr(Schema.Number),
                        id: Schema.String,
                        invoice: Schema.NullOr(Schema.String),
                        invoice_item: Schema.NullOr(Schema.String),
                        object: Schema.Literals(["discount"]),
                        promotion_code: Schema.Unknown,
                        source: Schema.Struct({
                          coupon: Schema.Unknown,
                          type: Schema.Literals(["coupon"]),
                        }),
                        start: Schema.Number,
                        subscription: Schema.NullOr(Schema.String),
                        subscription_item: Schema.NullOr(Schema.String),
                      }),
                    }),
                  ),
                ),
                id: Schema.String,
                metadata: Schema.NullOr(
                  Schema.Record(Schema.String, Schema.String),
                ),
                object: Schema.Literals(["item"]),
                price: Schema.Unknown,
                quantity: Schema.NullOr(Schema.Number),
                taxes: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      amount: Schema.Number,
                      rate: Schema.Struct({
                        active: Schema.Boolean,
                        country: Schema.NullOr(Schema.String),
                        created: Schema.Number,
                        description: Schema.NullOr(Schema.String),
                        display_name: Schema.String,
                        effective_percentage: Schema.NullOr(Schema.Number),
                        flat_amount: Schema.Unknown,
                        id: Schema.String,
                        inclusive: Schema.Boolean,
                        jurisdiction: Schema.NullOr(Schema.String),
                        jurisdiction_level: Schema.NullOr(
                          Schema.Literals([
                            "city",
                            "country",
                            "county",
                            "district",
                            "multiple",
                            "state",
                          ]),
                        ),
                        livemode: Schema.Boolean,
                        metadata: Schema.NullOr(
                          Schema.Record(Schema.String, Schema.String),
                        ),
                        object: Schema.Literals(["tax_rate"]),
                        percentage: Schema.Number,
                        rate_type: Schema.NullOr(
                          Schema.Literals(["flat_amount", "percentage"]),
                        ),
                        state: Schema.NullOr(Schema.String),
                        tax_type: Schema.NullOr(
                          Schema.Literals([
                            "amusement_tax",
                            "communications_tax",
                            "gst",
                            "hst",
                            "igst",
                            "jct",
                            "lease_tax",
                            "pst",
                            "qst",
                            "retail_delivery_fee",
                            "rst",
                            "sales_tax",
                            "service_tax",
                            "vat",
                          ]),
                        ),
                      }),
                      taxability_reason: Schema.NullOr(
                        Schema.Literals([
                          "customer_exempt",
                          "not_collecting",
                          "not_subject_to_tax",
                          "not_supported",
                          "portion_product_exempt",
                          "portion_reduced_rated",
                          "portion_standard_rated",
                          "product_exempt",
                          "product_exempt_holiday",
                          "proportionally_rated",
                          "reduced_rated",
                          "reverse_charge",
                          "standard_rated",
                          "taxable_basis_reduced",
                          "zero_rated",
                        ]),
                      ),
                      taxable_amount: Schema.NullOr(Schema.Number),
                    }),
                  ),
                ),
              }),
            ),
            has_more: Schema.Boolean,
            object: Schema.Literals(["list"]),
            url: Schema.String,
          }),
        ),
        livemode: Schema.Boolean,
        locale: Schema.NullOr(
          Schema.Literals([
            "auto",
            "bg",
            "cs",
            "da",
            "de",
            "el",
            "en",
            "en-GB",
            "es",
            "es-419",
            "et",
            "fi",
            "fil",
            "fr",
            "fr-CA",
            "hr",
            "hu",
            "id",
            "it",
            "ja",
            "ko",
            "lt",
            "lv",
            "ms",
            "mt",
            "nb",
            "nl",
            "pl",
            "pt",
            "pt-BR",
            "ro",
            "ru",
            "sk",
            "sl",
            "sv",
            "th",
            "tr",
            "vi",
            "zh",
            "zh-HK",
            "zh-TW",
          ]),
        ),
        metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
        mode: Schema.Literals(["payment", "setup", "subscription"]),
        name_collection: Schema.optional(
          Schema.Struct({
            business: Schema.optional(
              Schema.Struct({
                enabled: Schema.Boolean,
                optional: Schema.Boolean,
              }),
            ),
            individual: Schema.optional(
              Schema.Struct({
                enabled: Schema.Boolean,
                optional: Schema.Boolean,
              }),
            ),
          }),
        ),
        object: Schema.Literals(["checkout.session"]),
        optional_items: Schema.optional(
          Schema.NullOr(
            Schema.Array(
              Schema.Struct({
                adjustable_quantity: Schema.Unknown,
                price: Schema.String,
                quantity: Schema.Number,
              }),
            ),
          ),
        ),
        origin_context: Schema.NullOr(Schema.Literals(["mobile_app", "web"])),
        payment_intent: Schema.Unknown,
        payment_link: Schema.Unknown,
        payment_method_collection: Schema.NullOr(
          Schema.Literals(["always", "if_required"]),
        ),
        payment_method_configuration_details: Schema.Unknown,
        payment_method_options: Schema.Unknown,
        payment_method_types: Schema.Array(Schema.String),
        payment_status: Schema.Literals([
          "no_payment_required",
          "paid",
          "unpaid",
        ]),
        permissions: Schema.Unknown,
        phone_number_collection: Schema.optional(
          Schema.Struct({
            enabled: Schema.Boolean,
          }),
        ),
        presentment_details: Schema.optional(
          Schema.Struct({
            presentment_amount: Schema.Number,
            presentment_currency: Schema.String,
          }),
        ),
        recovered_from: Schema.NullOr(Schema.String),
        redirect_on_completion: Schema.optional(
          Schema.Literals(["always", "if_required", "never"]),
        ),
        return_url: Schema.optional(Schema.String),
        saved_payment_method_options: Schema.Unknown,
        setup_intent: Schema.Unknown,
        shipping_address_collection: Schema.Unknown,
        shipping_cost: Schema.Unknown,
        shipping_options: Schema.Array(
          Schema.Struct({
            shipping_amount: Schema.Number,
            shipping_rate: Schema.Unknown,
          }),
        ),
        status: Schema.NullOr(Schema.Literals(["complete", "expired", "open"])),
        submit_type: Schema.NullOr(
          Schema.Literals(["auto", "book", "donate", "pay", "subscribe"]),
        ),
        subscription: Schema.Unknown,
        success_url: Schema.NullOr(Schema.String),
        tax_id_collection: Schema.optional(
          Schema.Struct({
            enabled: Schema.Boolean,
            required: Schema.Literals(["if_supported", "never"]),
          }),
        ),
        total_details: Schema.Unknown,
        ui_mode: Schema.NullOr(
          Schema.Literals(["custom", "embedded", "hosted"]),
        ),
        url: Schema.NullOr(Schema.String),
        wallet_options: Schema.Unknown,
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetCheckoutSessionsOutput = typeof GetCheckoutSessionsOutput.Type;

// The operation
/**
 * List all Checkout Sessions
 *
 * <p>Returns a list of Checkout Sessions.</p>
 *
 * @param created - Only return Checkout Sessions that were created during the given date interval.
 * @param customer - Only return the Checkout Sessions for the Customer specified.
 * @param customer_account - Only return the Checkout Sessions for the Account specified.
 * @param customer_details - Only return the Checkout Sessions for the Customer details specified.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param payment_intent - Only return the Checkout Session for the PaymentIntent specified.
 * @param payment_link - Only return the Checkout Sessions for the Payment Link specified.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param status - Only return the Checkout Sessions matching the given status.
 * @param subscription - Only return the Checkout Session for the subscription specified.
 */
export const GetCheckoutSessions = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetCheckoutSessionsInput,
  outputSchema: GetCheckoutSessionsOutput,
}));
