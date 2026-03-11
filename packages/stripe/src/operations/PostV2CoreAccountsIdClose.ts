import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostV2CoreAccountsIdCloseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    applied_configurations: Schema.optional(
      Schema.Array(Schema.Literals(["customer", "merchant", "recipient"])),
    ),
  }).pipe(T.Http({ method: "POST", path: "/v2/core/accounts/{id}/close" }));
export type PostV2CoreAccountsIdCloseInput =
  typeof PostV2CoreAccountsIdCloseInput.Type;

// Output Schema
export const PostV2CoreAccountsIdCloseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    applied_configurations: Schema.Array(
      Schema.Literals(["customer", "merchant", "recipient"]),
    ),
    closed: Schema.optional(Schema.Boolean),
    configuration: Schema.optional(
      Schema.Struct({
        customer: Schema.optional(
          Schema.Struct({
            applied: Schema.Boolean,
            automatic_indirect_tax: Schema.optional(
              Schema.Struct({
                exempt: Schema.optional(
                  Schema.Literals(["exempt", "none", "reverse"]),
                ),
                ip_address: Schema.optional(Schema.String),
                location: Schema.optional(
                  Schema.Struct({
                    country: Schema.optional(Schema.String),
                    state: Schema.optional(Schema.String),
                  }),
                ),
                location_source: Schema.optional(
                  Schema.Literals([
                    "identity_address",
                    "ip_address",
                    "payment_method",
                    "shipping_address",
                  ]),
                ),
              }),
            ),
            billing: Schema.optional(
              Schema.Struct({
                default_payment_method: Schema.optional(Schema.String),
                invoice: Schema.optional(
                  Schema.Struct({
                    custom_fields: Schema.Array(
                      Schema.Struct({
                        name: Schema.String,
                        value: Schema.String,
                      }),
                    ),
                    footer: Schema.optional(Schema.String),
                    next_sequence: Schema.optional(Schema.Number),
                    prefix: Schema.optional(Schema.String),
                    rendering: Schema.optional(
                      Schema.Struct({
                        amount_tax_display: Schema.optional(
                          Schema.Literals([
                            "exclude_tax",
                            "include_inclusive_tax",
                          ]),
                        ),
                        template: Schema.optional(Schema.String),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            capabilities: Schema.optional(
              Schema.Struct({
                automatic_indirect_tax: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            shipping: Schema.optional(
              Schema.Struct({
                address: Schema.optional(
                  Schema.Struct({
                    city: Schema.optional(Schema.String),
                    country: Schema.optional(Schema.String),
                    line1: Schema.optional(Schema.String),
                    line2: Schema.optional(Schema.String),
                    postal_code: Schema.optional(Schema.String),
                    state: Schema.optional(Schema.String),
                  }),
                ),
                name: Schema.optional(Schema.String),
                phone: Schema.optional(Schema.String),
              }),
            ),
            test_clock: Schema.optional(Schema.String),
          }),
        ),
        merchant: Schema.optional(
          Schema.Struct({
            applied: Schema.Boolean,
            bacs_debit_payments: Schema.optional(
              Schema.Struct({
                display_name: Schema.optional(Schema.String),
                service_user_number: Schema.optional(Schema.String),
              }),
            ),
            branding: Schema.optional(
              Schema.Struct({
                icon: Schema.optional(Schema.String),
                logo: Schema.optional(Schema.String),
                primary_color: Schema.optional(Schema.String),
                secondary_color: Schema.optional(Schema.String),
              }),
            ),
            capabilities: Schema.optional(
              Schema.Struct({
                ach_debit_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                acss_debit_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                affirm_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                afterpay_clearpay_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                alma_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                amazon_pay_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                au_becs_debit_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                bacs_debit_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                bancontact_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                blik_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                boleto_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                card_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                cartes_bancaires_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                cashapp_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                eps_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                fpx_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                gb_bank_transfer_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                grabpay_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                ideal_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                jcb_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                jp_bank_transfer_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                kakao_pay_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                klarna_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                konbini_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                kr_card_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                link_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                mobilepay_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                multibanco_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                mx_bank_transfer_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                naver_pay_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                oxxo_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                p24_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                pay_by_bank_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                payco_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                paynow_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                promptpay_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                revolut_pay_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                samsung_pay_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                sepa_bank_transfer_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                sepa_debit_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                stripe_balance: Schema.optional(
                  Schema.Struct({
                    payouts: Schema.optional(
                      Schema.Struct({
                        status: Schema.Literals([
                          "active",
                          "pending",
                          "restricted",
                          "unsupported",
                        ]),
                        status_details: Schema.Array(
                          Schema.Struct({
                            code: Schema.Literals([
                              "determining_status",
                              "requirements_past_due",
                              "requirements_pending_verification",
                              "restricted_other",
                              "unsupported_business",
                              "unsupported_country",
                              "unsupported_entity_type",
                            ]),
                            resolution: Schema.Literals([
                              "contact_stripe",
                              "no_resolution",
                              "provide_info",
                            ]),
                          }),
                        ),
                      }),
                    ),
                  }),
                ),
                swish_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                twint_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                us_bank_transfer_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
                zip_payments: Schema.optional(
                  Schema.Struct({
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                      "unsupported",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "determining_status",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_other",
                          "unsupported_business",
                          "unsupported_country",
                          "unsupported_entity_type",
                        ]),
                        resolution: Schema.Literals([
                          "contact_stripe",
                          "no_resolution",
                          "provide_info",
                        ]),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            card_payments: Schema.optional(
              Schema.Struct({
                decline_on: Schema.optional(
                  Schema.Struct({
                    avs_failure: Schema.optional(Schema.Boolean),
                    cvc_failure: Schema.optional(Schema.Boolean),
                  }),
                ),
              }),
            ),
            konbini_payments: Schema.optional(
              Schema.Struct({
                support: Schema.optional(
                  Schema.Struct({
                    email: Schema.optional(Schema.String),
                    hours: Schema.optional(
                      Schema.Struct({
                        end_time: Schema.optional(Schema.String),
                        start_time: Schema.optional(Schema.String),
                      }),
                    ),
                    phone: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            mcc: Schema.optional(Schema.String),
            script_statement_descriptor: Schema.optional(
              Schema.Struct({
                kana: Schema.optional(
                  Schema.Struct({
                    descriptor: Schema.optional(Schema.String),
                    prefix: Schema.optional(Schema.String),
                  }),
                ),
                kanji: Schema.optional(
                  Schema.Struct({
                    descriptor: Schema.optional(Schema.String),
                    prefix: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            sepa_debit_payments: Schema.optional(
              Schema.Struct({
                creditor_id: Schema.optional(Schema.String),
              }),
            ),
            statement_descriptor: Schema.optional(
              Schema.Struct({
                descriptor: Schema.optional(Schema.String),
                prefix: Schema.optional(Schema.String),
              }),
            ),
            support: Schema.optional(
              Schema.Struct({
                address: Schema.optional(
                  Schema.Struct({
                    city: Schema.optional(Schema.String),
                    country: Schema.optional(Schema.String),
                    line1: Schema.optional(Schema.String),
                    line2: Schema.optional(Schema.String),
                    postal_code: Schema.optional(Schema.String),
                    state: Schema.optional(Schema.String),
                    town: Schema.optional(Schema.String),
                  }),
                ),
                email: Schema.optional(Schema.String),
                phone: Schema.optional(Schema.String),
                url: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
        recipient: Schema.optional(
          Schema.Struct({
            applied: Schema.Boolean,
            capabilities: Schema.optional(
              Schema.Struct({
                stripe_balance: Schema.optional(
                  Schema.Struct({
                    payouts: Schema.optional(
                      Schema.Struct({
                        status: Schema.Literals([
                          "active",
                          "pending",
                          "restricted",
                          "unsupported",
                        ]),
                        status_details: Schema.Array(
                          Schema.Struct({
                            code: Schema.Literals([
                              "determining_status",
                              "requirements_past_due",
                              "requirements_pending_verification",
                              "restricted_other",
                              "unsupported_business",
                              "unsupported_country",
                              "unsupported_entity_type",
                            ]),
                            resolution: Schema.Literals([
                              "contact_stripe",
                              "no_resolution",
                              "provide_info",
                            ]),
                          }),
                        ),
                      }),
                    ),
                    stripe_transfers: Schema.optional(
                      Schema.Struct({
                        status: Schema.Literals([
                          "active",
                          "pending",
                          "restricted",
                          "unsupported",
                        ]),
                        status_details: Schema.Array(
                          Schema.Struct({
                            code: Schema.Literals([
                              "determining_status",
                              "requirements_past_due",
                              "requirements_pending_verification",
                              "restricted_other",
                              "unsupported_business",
                              "unsupported_country",
                              "unsupported_entity_type",
                            ]),
                            resolution: Schema.Literals([
                              "contact_stripe",
                              "no_resolution",
                              "provide_info",
                            ]),
                          }),
                        ),
                      }),
                    ),
                  }),
                ),
              }),
            ),
          }),
        ),
      }),
    ),
    contact_email: Schema.optional(Schema.String),
    contact_phone: Schema.optional(Schema.String),
    created: Schema.String,
    dashboard: Schema.optional(Schema.Literals(["express", "full", "none"])),
    defaults: Schema.optional(
      Schema.Struct({
        currency: Schema.optional(Schema.String),
        locales: Schema.optional(
          Schema.Array(
            Schema.Literals([
              "ar-SA",
              "bg",
              "bg-BG",
              "cs",
              "cs-CZ",
              "da",
              "da-DK",
              "de",
              "de-DE",
              "el",
              "el-GR",
              "en",
              "en-AU",
              "en-CA",
              "en-GB",
              "en-IE",
              "en-IN",
              "en-NZ",
              "en-SG",
              "en-US",
              "es",
              "es-419",
              "es-ES",
              "et",
              "et-EE",
              "fi",
              "fil",
              "fil-PH",
              "fi-FI",
              "fr",
              "fr-CA",
              "fr-FR",
              "he-IL",
              "hr",
              "hr-HR",
              "hu",
              "hu-HU",
              "id",
              "id-ID",
              "it",
              "it-IT",
              "ja",
              "ja-JP",
              "ko",
              "ko-KR",
              "lt",
              "lt-LT",
              "lv",
              "lv-LV",
              "ms",
              "ms-MY",
              "mt",
              "mt-MT",
              "nb",
              "nb-NO",
              "nl",
              "nl-NL",
              "pl",
              "pl-PL",
              "pt",
              "pt-BR",
              "pt-PT",
              "ro",
              "ro-RO",
              "ru",
              "ru-RU",
              "sk",
              "sk-SK",
              "sl",
              "sl-SI",
              "sv",
              "sv-SE",
              "th",
              "th-TH",
              "tr",
              "tr-TR",
              "vi",
              "vi-VN",
              "zh",
              "zh-Hans",
              "zh-Hant-HK",
              "zh-Hant-TW",
              "zh-HK",
              "zh-TW",
            ]),
          ),
        ),
        profile: Schema.optional(
          Schema.Struct({
            business_url: Schema.optional(Schema.String),
            doing_business_as: Schema.optional(Schema.String),
            product_description: Schema.optional(Schema.String),
          }),
        ),
        responsibilities: Schema.Struct({
          fees_collector: Schema.optional(
            Schema.Literals([
              "application",
              "application_custom",
              "application_express",
              "stripe",
            ]),
          ),
          losses_collector: Schema.optional(
            Schema.Literals(["application", "stripe"]),
          ),
          requirements_collector: Schema.Literals(["application", "stripe"]),
        }),
      }),
    ),
    display_name: Schema.optional(Schema.String),
    future_requirements: Schema.optional(
      Schema.Struct({
        entries: Schema.optional(
          Schema.Array(
            Schema.Struct({
              awaiting_action_from: Schema.Literals(["stripe", "user"]),
              description: Schema.String,
              errors: Schema.Array(
                Schema.Struct({
                  code: Schema.Literals([
                    "invalid_address_city_state_postal_code",
                    "invalid_address_highway_contract_box",
                    "invalid_address_private_mailbox",
                    "invalid_business_profile_name",
                    "invalid_business_profile_name_denylisted",
                    "invalid_company_name_denylisted",
                    "invalid_dob_age_over_maximum",
                    "invalid_dob_age_under_18",
                    "invalid_dob_age_under_minimum",
                    "invalid_product_description_length",
                    "invalid_product_description_url_match",
                    "invalid_representative_country",
                    "invalid_statement_descriptor_business_mismatch",
                    "invalid_statement_descriptor_denylisted",
                    "invalid_statement_descriptor_length",
                    "invalid_statement_descriptor_prefix_denylisted",
                    "invalid_statement_descriptor_prefix_mismatch",
                    "invalid_street_address",
                    "invalid_tax_id",
                    "invalid_tax_id_format",
                    "invalid_tos_acceptance",
                    "invalid_url_denylisted",
                    "invalid_url_format",
                    "invalid_url_website_business_information_mismatch",
                    "invalid_url_website_empty",
                    "invalid_url_website_inaccessible",
                    "invalid_url_website_inaccessible_geoblocked",
                    "invalid_url_website_inaccessible_password_protected",
                    "invalid_url_website_incomplete",
                    "invalid_url_website_incomplete_cancellation_policy",
                    "invalid_url_website_incomplete_customer_service_details",
                    "invalid_url_website_incomplete_legal_restrictions",
                    "invalid_url_website_incomplete_refund_policy",
                    "invalid_url_website_incomplete_return_policy",
                    "invalid_url_website_incomplete_terms_and_conditions",
                    "invalid_url_website_incomplete_under_construction",
                    "invalid_url_website_other",
                    "invalid_url_web_presence_detected",
                    "invalid_value_other",
                    "unresolvable_ip_address",
                    "unresolvable_postal_code",
                    "verification_directors_mismatch",
                    "verification_document_address_mismatch",
                    "verification_document_address_missing",
                    "verification_document_corrupt",
                    "verification_document_country_not_supported",
                    "verification_document_directors_mismatch",
                    "verification_document_dob_mismatch",
                    "verification_document_duplicate_type",
                    "verification_document_expired",
                    "verification_document_failed_copy",
                    "verification_document_failed_greyscale",
                    "verification_document_failed_other",
                    "verification_document_failed_test_mode",
                    "verification_document_fraudulent",
                    "verification_document_id_number_mismatch",
                    "verification_document_id_number_missing",
                    "verification_document_incomplete",
                    "verification_document_invalid",
                    "verification_document_issue_or_expiry_date_missing",
                    "verification_document_manipulated",
                    "verification_document_missing_back",
                    "verification_document_missing_front",
                    "verification_document_name_mismatch",
                    "verification_document_name_missing",
                    "verification_document_nationality_mismatch",
                    "verification_document_not_readable",
                    "verification_document_not_signed",
                    "verification_document_not_uploaded",
                    "verification_document_photo_mismatch",
                    "verification_document_too_large",
                    "verification_document_type_not_supported",
                    "verification_extraneous_directors",
                    "verification_failed_address_match",
                    "verification_failed_business_iec_number",
                    "verification_failed_document_match",
                    "verification_failed_id_number_match",
                    "verification_failed_keyed_identity",
                    "verification_failed_keyed_match",
                    "verification_failed_name_match",
                    "verification_failed_other",
                    "verification_failed_representative_authority",
                    "verification_failed_residential_address",
                    "verification_failed_tax_id_match",
                    "verification_failed_tax_id_not_issued",
                    "verification_missing_directors",
                    "verification_missing_executives",
                    "verification_missing_owners",
                    "verification_requires_additional_memorandum_of_associations",
                    "verification_requires_additional_proof_of_registration",
                    "verification_selfie_document_missing_photo",
                    "verification_selfie_face_mismatch",
                    "verification_selfie_manipulated",
                    "verification_selfie_unverified_other",
                    "verification_supportability",
                    "verification_token_stale",
                  ]),
                  description: Schema.String,
                }),
              ),
              impact: Schema.Struct({
                restricts_capabilities: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      capability: Schema.Literals([
                        "ach_debit_payments",
                        "acss_debit_payments",
                        "affirm_payments",
                        "afterpay_clearpay_payments",
                        "alma_payments",
                        "amazon_pay_payments",
                        "automatic_indirect_tax",
                        "au_becs_debit_payments",
                        "bacs_debit_payments",
                        "bancontact_payments",
                        "bank_accounts.local",
                        "bank_accounts.wire",
                        "blik_payments",
                        "boleto_payments",
                        "cards",
                        "card_payments",
                        "cartes_bancaires_payments",
                        "cashapp_payments",
                        "eps_payments",
                        "fpx_payments",
                        "gb_bank_transfer_payments",
                        "grabpay_payments",
                        "ideal_payments",
                        "jcb_payments",
                        "jp_bank_transfer_payments",
                        "kakao_pay_payments",
                        "klarna_payments",
                        "konbini_payments",
                        "kr_card_payments",
                        "link_payments",
                        "mobilepay_payments",
                        "multibanco_payments",
                        "mx_bank_transfer_payments",
                        "naver_pay_payments",
                        "oxxo_payments",
                        "p24_payments",
                        "payco_payments",
                        "paynow_payments",
                        "pay_by_bank_payments",
                        "promptpay_payments",
                        "revolut_pay_payments",
                        "samsung_pay_payments",
                        "sepa_bank_transfer_payments",
                        "sepa_debit_payments",
                        "stripe_balance.payouts",
                        "stripe_balance.stripe_transfers",
                        "swish_payments",
                        "twint_payments",
                        "us_bank_transfer_payments",
                        "zip_payments",
                      ]),
                      configuration: Schema.Literals([
                        "customer",
                        "merchant",
                        "recipient",
                      ]),
                      deadline: Schema.Struct({
                        status: Schema.Literals([
                          "currently_due",
                          "eventually_due",
                          "past_due",
                        ]),
                      }),
                    }),
                  ),
                ),
              }),
              minimum_deadline: Schema.Struct({
                status: Schema.Literals([
                  "currently_due",
                  "eventually_due",
                  "past_due",
                ]),
              }),
              reference: Schema.optional(
                Schema.Struct({
                  inquiry: Schema.optional(Schema.String),
                  resource: Schema.optional(Schema.String),
                  type: Schema.Literals([
                    "inquiry",
                    "payment_method",
                    "person",
                  ]),
                }),
              ),
              requested_reasons: Schema.Array(
                Schema.Struct({
                  code: Schema.Literals([
                    "routine_onboarding",
                    "routine_verification",
                  ]),
                }),
              ),
            }),
          ),
        ),
        minimum_transition_date: Schema.optional(Schema.String),
        summary: Schema.optional(
          Schema.Struct({
            minimum_deadline: Schema.optional(
              Schema.Struct({
                status: Schema.Literals([
                  "currently_due",
                  "eventually_due",
                  "past_due",
                ]),
                time: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
      }),
    ),
    id: Schema.String,
    identity: Schema.optional(
      Schema.Struct({
        attestations: Schema.optional(
          Schema.Struct({
            directorship_declaration: Schema.optional(
              Schema.Struct({
                date: Schema.optional(Schema.String),
                ip: Schema.optional(Schema.String),
                user_agent: Schema.optional(Schema.String),
              }),
            ),
            ownership_declaration: Schema.optional(
              Schema.Struct({
                date: Schema.optional(Schema.String),
                ip: Schema.optional(Schema.String),
                user_agent: Schema.optional(Schema.String),
              }),
            ),
            persons_provided: Schema.optional(
              Schema.Struct({
                directors: Schema.optional(Schema.Boolean),
                executives: Schema.optional(Schema.Boolean),
                owners: Schema.optional(Schema.Boolean),
                ownership_exemption_reason: Schema.optional(
                  Schema.Literals([
                    "qualified_entity_exceeds_ownership_threshold",
                    "qualifies_as_financial_institution",
                  ]),
                ),
              }),
            ),
            representative_declaration: Schema.optional(
              Schema.Struct({
                date: Schema.optional(Schema.String),
                ip: Schema.optional(Schema.String),
                user_agent: Schema.optional(Schema.String),
              }),
            ),
            terms_of_service: Schema.optional(
              Schema.Struct({
                account: Schema.optional(
                  Schema.Struct({
                    date: Schema.optional(Schema.String),
                    ip: Schema.optional(Schema.String),
                    user_agent: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
          }),
        ),
        business_details: Schema.optional(
          Schema.Struct({
            address: Schema.optional(
              Schema.Struct({
                city: Schema.optional(Schema.String),
                country: Schema.optional(Schema.String),
                line1: Schema.optional(Schema.String),
                line2: Schema.optional(Schema.String),
                postal_code: Schema.optional(Schema.String),
                state: Schema.optional(Schema.String),
                town: Schema.optional(Schema.String),
              }),
            ),
            annual_revenue: Schema.optional(
              Schema.Struct({
                amount: Schema.optional(
                  Schema.Struct({
                    currency: Schema.String,
                    value: Schema.Number,
                  }),
                ),
                fiscal_year_end: Schema.optional(Schema.String),
              }),
            ),
            documents: Schema.optional(
              Schema.Struct({
                bank_account_ownership_verification: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                company_license: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                company_memorandum_of_association: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                company_ministerial_decree: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                company_registration_verification: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                company_tax_id_verification: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                primary_verification: Schema.optional(
                  Schema.Struct({
                    front_back: Schema.Struct({
                      back: Schema.optional(Schema.String),
                      front: Schema.String,
                    }),
                    type: Schema.Literals(["front_back"]),
                  }),
                ),
                proof_of_address: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                proof_of_registration: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                proof_of_ultimate_beneficial_ownership: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
              }),
            ),
            estimated_worker_count: Schema.optional(Schema.Number),
            id_numbers: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  registrar: Schema.optional(Schema.String),
                  type: Schema.Literals([
                    "ae_crn",
                    "ae_vat",
                    "ao_nif",
                    "ar_cuit",
                    "at_fn",
                    "at_stn",
                    "at_vat",
                    "au_abn",
                    "au_acn",
                    "au_in",
                    "az_tin",
                    "bd_etin",
                    "be_cbe",
                    "be_vat",
                    "bg_uic",
                    "bg_vat",
                    "br_cnpj",
                    "ca_cn",
                    "ca_crarr",
                    "ca_gst_hst",
                    "ca_neq",
                    "ca_rid",
                    "ch_chid",
                    "ch_uid",
                    "cr_cpj",
                    "cr_nite",
                    "cy_he",
                    "cy_tic",
                    "cy_vat",
                    "cz_ico",
                    "cz_vat",
                    "de_hrn",
                    "de_stn",
                    "de_vat",
                    "dk_cvr",
                    "dk_vat",
                    "do_rcn",
                    "ee_rk",
                    "ee_vat",
                    "es_cif",
                    "es_vat",
                    "fi_vat",
                    "fi_yt",
                    "fr_rna",
                    "fr_siren",
                    "fr_vat",
                    "gb_crn",
                    "gb_vat",
                    "gi_crn",
                    "gr_afm",
                    "gr_gemi",
                    "gr_vat",
                    "gt_nit",
                    "hk_br",
                    "hk_cr",
                    "hr_mbs",
                    "hr_oib",
                    "hr_vat",
                    "hu_cjs",
                    "hu_tin",
                    "hu_vat",
                    "ie_crn",
                    "ie_trn",
                    "ie_vat",
                    "it_rea",
                    "it_vat",
                    "jp_cn",
                    "kz_bin",
                    "li_uid",
                    "lt_ccrn",
                    "lt_vat",
                    "lu_nif",
                    "lu_rcs",
                    "lu_vat",
                    "lv_urn",
                    "lv_vat",
                    "mt_crn",
                    "mt_tin",
                    "mt_vat",
                    "mx_rfc",
                    "my_brn",
                    "my_coid",
                    "my_itn",
                    "my_sst",
                    "mz_nuit",
                    "nl_kvk",
                    "nl_rsin",
                    "nl_vat",
                    "no_orgnr",
                    "nz_bn",
                    "nz_ird",
                    "pe_ruc",
                    "pk_ntn",
                    "pl_nip",
                    "pl_regon",
                    "pl_vat",
                    "pt_vat",
                    "ro_cui",
                    "ro_orc",
                    "ro_vat",
                    "sa_crn",
                    "sa_tin",
                    "se_orgnr",
                    "se_vat",
                    "sg_uen",
                    "si_msp",
                    "si_tin",
                    "si_vat",
                    "sk_dic",
                    "sk_ico",
                    "sk_vat",
                    "th_crn",
                    "th_prn",
                    "th_tin",
                    "us_ein",
                  ]),
                }),
              ),
            ),
            monthly_estimated_revenue: Schema.optional(
              Schema.Struct({
                amount: Schema.optional(
                  Schema.Struct({
                    currency: Schema.String,
                    value: Schema.Number,
                  }),
                ),
              }),
            ),
            phone: Schema.optional(Schema.String),
            registered_name: Schema.optional(Schema.String),
            registration_date: Schema.optional(
              Schema.Struct({
                day: Schema.Number,
                month: Schema.Number,
                year: Schema.Number,
              }),
            ),
            script_addresses: Schema.optional(
              Schema.Struct({
                kana: Schema.optional(
                  Schema.Struct({
                    city: Schema.optional(Schema.String),
                    country: Schema.optional(Schema.String),
                    line1: Schema.optional(Schema.String),
                    line2: Schema.optional(Schema.String),
                    postal_code: Schema.optional(Schema.String),
                    state: Schema.optional(Schema.String),
                    town: Schema.optional(Schema.String),
                  }),
                ),
                kanji: Schema.optional(
                  Schema.Struct({
                    city: Schema.optional(Schema.String),
                    country: Schema.optional(Schema.String),
                    line1: Schema.optional(Schema.String),
                    line2: Schema.optional(Schema.String),
                    postal_code: Schema.optional(Schema.String),
                    state: Schema.optional(Schema.String),
                    town: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            script_names: Schema.optional(
              Schema.Struct({
                kana: Schema.optional(
                  Schema.Struct({
                    registered_name: Schema.optional(Schema.String),
                  }),
                ),
                kanji: Schema.optional(
                  Schema.Struct({
                    registered_name: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            structure: Schema.optional(
              Schema.Literals([
                "cooperative",
                "free_zone_establishment",
                "free_zone_llc",
                "governmental_unit",
                "government_instrumentality",
                "incorporated_association",
                "incorporated_non_profit",
                "incorporated_partnership",
                "limited_liability_partnership",
                "llc",
                "multi_member_llc",
                "private_company",
                "private_corporation",
                "private_partnership",
                "public_company",
                "public_corporation",
                "public_listed_corporation",
                "public_partnership",
                "registered_charity",
                "single_member_llc",
                "sole_establishment",
                "sole_proprietorship",
                "tax_exempt_government_instrumentality",
                "trust",
                "unincorporated_association",
                "unincorporated_non_profit",
                "unincorporated_partnership",
              ]),
            ),
          }),
        ),
        country: Schema.optional(Schema.String),
        entity_type: Schema.optional(
          Schema.Literals([
            "company",
            "government_entity",
            "individual",
            "non_profit",
          ]),
        ),
        individual: Schema.optional(
          Schema.Struct({
            account: Schema.String,
            additional_addresses: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  city: Schema.optional(Schema.String),
                  country: Schema.optional(Schema.String),
                  line1: Schema.optional(Schema.String),
                  line2: Schema.optional(Schema.String),
                  postal_code: Schema.optional(Schema.String),
                  purpose: Schema.Literals(["registered"]),
                  state: Schema.optional(Schema.String),
                  town: Schema.optional(Schema.String),
                }),
              ),
            ),
            additional_names: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  full_name: Schema.optional(Schema.String),
                  given_name: Schema.optional(Schema.String),
                  purpose: Schema.Literals(["alias", "maiden"]),
                  surname: Schema.optional(Schema.String),
                }),
              ),
            ),
            additional_terms_of_service: Schema.optional(
              Schema.Struct({
                account: Schema.optional(
                  Schema.Struct({
                    date: Schema.optional(Schema.String),
                    ip: Schema.optional(Schema.String),
                    user_agent: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            address: Schema.optional(
              Schema.Struct({
                city: Schema.optional(Schema.String),
                country: Schema.optional(Schema.String),
                line1: Schema.optional(Schema.String),
                line2: Schema.optional(Schema.String),
                postal_code: Schema.optional(Schema.String),
                state: Schema.optional(Schema.String),
                town: Schema.optional(Schema.String),
              }),
            ),
            created: Schema.String,
            date_of_birth: Schema.optional(
              Schema.Struct({
                day: Schema.Number,
                month: Schema.Number,
                year: Schema.Number,
              }),
            ),
            documents: Schema.optional(
              Schema.Struct({
                company_authorization: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                passport: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
                primary_verification: Schema.optional(
                  Schema.Struct({
                    front_back: Schema.Struct({
                      back: Schema.optional(Schema.String),
                      front: Schema.String,
                    }),
                    type: Schema.Literals(["front_back"]),
                  }),
                ),
                secondary_verification: Schema.optional(
                  Schema.Struct({
                    front_back: Schema.Struct({
                      back: Schema.optional(Schema.String),
                      front: Schema.String,
                    }),
                    type: Schema.Literals(["front_back"]),
                  }),
                ),
                visa: Schema.optional(
                  Schema.Struct({
                    files: Schema.Array(Schema.String),
                    type: Schema.Literals(["files"]),
                  }),
                ),
              }),
            ),
            email: Schema.optional(Schema.String),
            given_name: Schema.optional(Schema.String),
            id: Schema.String,
            id_numbers: Schema.optional(
              Schema.Array(
                Schema.Struct({
                  type: Schema.Literals([
                    "ae_eid",
                    "ao_nif",
                    "ar_cuil",
                    "ar_dni",
                    "at_stn",
                    "az_tin",
                    "bd_brc",
                    "bd_etin",
                    "bd_nid",
                    "be_nrn",
                    "bg_ucn",
                    "bn_nric",
                    "br_cpf",
                    "ca_sin",
                    "ch_oasi",
                    "cl_rut",
                    "cn_pp",
                    "co_nuip",
                    "cr_ci",
                    "cr_cpf",
                    "cr_dimex",
                    "cr_nite",
                    "cy_tic",
                    "cz_rc",
                    "de_stn",
                    "dk_cpr",
                    "do_cie",
                    "do_rcn",
                    "ec_ci",
                    "ee_ik",
                    "es_nif",
                    "fi_hetu",
                    "fr_nir",
                    "gb_nino",
                    "gr_afm",
                    "gt_nit",
                    "hk_id",
                    "hr_oib",
                    "hu_ad",
                    "id_nik",
                    "ie_ppsn",
                    "is_kt",
                    "it_cf",
                    "jp_inc",
                    "ke_pin",
                    "kz_iin",
                    "li_peid",
                    "lt_ak",
                    "lu_nif",
                    "lv_pk",
                    "mx_rfc",
                    "my_nric",
                    "mz_nuit",
                    "ng_nin",
                    "nl_bsn",
                    "no_nin",
                    "nz_ird",
                    "pe_dni",
                    "pk_cnic",
                    "pk_snic",
                    "pl_pesel",
                    "pt_nif",
                    "ro_cnp",
                    "sa_tin",
                    "se_pin",
                    "sg_fin",
                    "sg_nric",
                    "sk_dic",
                    "th_lc",
                    "th_pin",
                    "tr_tin",
                    "us_itin",
                    "us_itin_last_4",
                    "us_ssn",
                    "us_ssn_last_4",
                    "uy_dni",
                    "za_id",
                  ]),
                }),
              ),
            ),
            legal_gender: Schema.optional(Schema.Literals(["female", "male"])),
            metadata: Schema.optional(
              Schema.Record(Schema.String, Schema.String),
            ),
            nationalities: Schema.optional(Schema.Array(Schema.String)),
            object: Schema.String,
            phone: Schema.optional(Schema.String),
            political_exposure: Schema.optional(
              Schema.Literals(["existing", "none"]),
            ),
            relationship: Schema.optional(
              Schema.Struct({
                authorizer: Schema.optional(Schema.Boolean),
                director: Schema.optional(Schema.Boolean),
                executive: Schema.optional(Schema.Boolean),
                legal_guardian: Schema.optional(Schema.Boolean),
                owner: Schema.optional(Schema.Boolean),
                percent_ownership: Schema.optional(Schema.String),
                representative: Schema.optional(Schema.Boolean),
                title: Schema.optional(Schema.String),
              }),
            ),
            script_addresses: Schema.optional(
              Schema.Struct({
                kana: Schema.optional(
                  Schema.Struct({
                    city: Schema.optional(Schema.String),
                    country: Schema.optional(Schema.String),
                    line1: Schema.optional(Schema.String),
                    line2: Schema.optional(Schema.String),
                    postal_code: Schema.optional(Schema.String),
                    state: Schema.optional(Schema.String),
                    town: Schema.optional(Schema.String),
                  }),
                ),
                kanji: Schema.optional(
                  Schema.Struct({
                    city: Schema.optional(Schema.String),
                    country: Schema.optional(Schema.String),
                    line1: Schema.optional(Schema.String),
                    line2: Schema.optional(Schema.String),
                    postal_code: Schema.optional(Schema.String),
                    state: Schema.optional(Schema.String),
                    town: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            script_names: Schema.optional(
              Schema.Struct({
                kana: Schema.optional(
                  Schema.Struct({
                    given_name: Schema.optional(Schema.String),
                    surname: Schema.optional(Schema.String),
                  }),
                ),
                kanji: Schema.optional(
                  Schema.Struct({
                    given_name: Schema.optional(Schema.String),
                    surname: Schema.optional(Schema.String),
                  }),
                ),
              }),
            ),
            surname: Schema.optional(Schema.String),
            updated: Schema.String,
          }),
        ),
      }),
    ),
    livemode: Schema.Boolean,
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    object: Schema.Literals(["v2.core.account"]),
    requirements: Schema.optional(
      Schema.Struct({
        entries: Schema.optional(
          Schema.Array(
            Schema.Struct({
              awaiting_action_from: Schema.Literals(["stripe", "user"]),
              description: Schema.String,
              errors: Schema.Array(
                Schema.Struct({
                  code: Schema.Literals([
                    "invalid_address_city_state_postal_code",
                    "invalid_address_highway_contract_box",
                    "invalid_address_private_mailbox",
                    "invalid_business_profile_name",
                    "invalid_business_profile_name_denylisted",
                    "invalid_company_name_denylisted",
                    "invalid_dob_age_over_maximum",
                    "invalid_dob_age_under_18",
                    "invalid_dob_age_under_minimum",
                    "invalid_product_description_length",
                    "invalid_product_description_url_match",
                    "invalid_representative_country",
                    "invalid_statement_descriptor_business_mismatch",
                    "invalid_statement_descriptor_denylisted",
                    "invalid_statement_descriptor_length",
                    "invalid_statement_descriptor_prefix_denylisted",
                    "invalid_statement_descriptor_prefix_mismatch",
                    "invalid_street_address",
                    "invalid_tax_id",
                    "invalid_tax_id_format",
                    "invalid_tos_acceptance",
                    "invalid_url_denylisted",
                    "invalid_url_format",
                    "invalid_url_website_business_information_mismatch",
                    "invalid_url_website_empty",
                    "invalid_url_website_inaccessible",
                    "invalid_url_website_inaccessible_geoblocked",
                    "invalid_url_website_inaccessible_password_protected",
                    "invalid_url_website_incomplete",
                    "invalid_url_website_incomplete_cancellation_policy",
                    "invalid_url_website_incomplete_customer_service_details",
                    "invalid_url_website_incomplete_legal_restrictions",
                    "invalid_url_website_incomplete_refund_policy",
                    "invalid_url_website_incomplete_return_policy",
                    "invalid_url_website_incomplete_terms_and_conditions",
                    "invalid_url_website_incomplete_under_construction",
                    "invalid_url_website_other",
                    "invalid_url_web_presence_detected",
                    "invalid_value_other",
                    "unresolvable_ip_address",
                    "unresolvable_postal_code",
                    "verification_directors_mismatch",
                    "verification_document_address_mismatch",
                    "verification_document_address_missing",
                    "verification_document_corrupt",
                    "verification_document_country_not_supported",
                    "verification_document_directors_mismatch",
                    "verification_document_dob_mismatch",
                    "verification_document_duplicate_type",
                    "verification_document_expired",
                    "verification_document_failed_copy",
                    "verification_document_failed_greyscale",
                    "verification_document_failed_other",
                    "verification_document_failed_test_mode",
                    "verification_document_fraudulent",
                    "verification_document_id_number_mismatch",
                    "verification_document_id_number_missing",
                    "verification_document_incomplete",
                    "verification_document_invalid",
                    "verification_document_issue_or_expiry_date_missing",
                    "verification_document_manipulated",
                    "verification_document_missing_back",
                    "verification_document_missing_front",
                    "verification_document_name_mismatch",
                    "verification_document_name_missing",
                    "verification_document_nationality_mismatch",
                    "verification_document_not_readable",
                    "verification_document_not_signed",
                    "verification_document_not_uploaded",
                    "verification_document_photo_mismatch",
                    "verification_document_too_large",
                    "verification_document_type_not_supported",
                    "verification_extraneous_directors",
                    "verification_failed_address_match",
                    "verification_failed_business_iec_number",
                    "verification_failed_document_match",
                    "verification_failed_id_number_match",
                    "verification_failed_keyed_identity",
                    "verification_failed_keyed_match",
                    "verification_failed_name_match",
                    "verification_failed_other",
                    "verification_failed_representative_authority",
                    "verification_failed_residential_address",
                    "verification_failed_tax_id_match",
                    "verification_failed_tax_id_not_issued",
                    "verification_missing_directors",
                    "verification_missing_executives",
                    "verification_missing_owners",
                    "verification_requires_additional_memorandum_of_associations",
                    "verification_requires_additional_proof_of_registration",
                    "verification_selfie_document_missing_photo",
                    "verification_selfie_face_mismatch",
                    "verification_selfie_manipulated",
                    "verification_selfie_unverified_other",
                    "verification_supportability",
                    "verification_token_stale",
                  ]),
                  description: Schema.String,
                }),
              ),
              impact: Schema.Struct({
                restricts_capabilities: Schema.optional(
                  Schema.Array(
                    Schema.Struct({
                      capability: Schema.Literals([
                        "ach_debit_payments",
                        "acss_debit_payments",
                        "affirm_payments",
                        "afterpay_clearpay_payments",
                        "alma_payments",
                        "amazon_pay_payments",
                        "automatic_indirect_tax",
                        "au_becs_debit_payments",
                        "bacs_debit_payments",
                        "bancontact_payments",
                        "bank_accounts.local",
                        "bank_accounts.wire",
                        "blik_payments",
                        "boleto_payments",
                        "cards",
                        "card_payments",
                        "cartes_bancaires_payments",
                        "cashapp_payments",
                        "eps_payments",
                        "fpx_payments",
                        "gb_bank_transfer_payments",
                        "grabpay_payments",
                        "ideal_payments",
                        "jcb_payments",
                        "jp_bank_transfer_payments",
                        "kakao_pay_payments",
                        "klarna_payments",
                        "konbini_payments",
                        "kr_card_payments",
                        "link_payments",
                        "mobilepay_payments",
                        "multibanco_payments",
                        "mx_bank_transfer_payments",
                        "naver_pay_payments",
                        "oxxo_payments",
                        "p24_payments",
                        "payco_payments",
                        "paynow_payments",
                        "pay_by_bank_payments",
                        "promptpay_payments",
                        "revolut_pay_payments",
                        "samsung_pay_payments",
                        "sepa_bank_transfer_payments",
                        "sepa_debit_payments",
                        "stripe_balance.payouts",
                        "stripe_balance.stripe_transfers",
                        "swish_payments",
                        "twint_payments",
                        "us_bank_transfer_payments",
                        "zip_payments",
                      ]),
                      configuration: Schema.Literals([
                        "customer",
                        "merchant",
                        "recipient",
                      ]),
                      deadline: Schema.Struct({
                        status: Schema.Literals([
                          "currently_due",
                          "eventually_due",
                          "past_due",
                        ]),
                      }),
                    }),
                  ),
                ),
              }),
              minimum_deadline: Schema.Struct({
                status: Schema.Literals([
                  "currently_due",
                  "eventually_due",
                  "past_due",
                ]),
              }),
              reference: Schema.optional(
                Schema.Struct({
                  inquiry: Schema.optional(Schema.String),
                  resource: Schema.optional(Schema.String),
                  type: Schema.Literals([
                    "inquiry",
                    "payment_method",
                    "person",
                  ]),
                }),
              ),
              requested_reasons: Schema.Array(
                Schema.Struct({
                  code: Schema.Literals([
                    "routine_onboarding",
                    "routine_verification",
                  ]),
                }),
              ),
            }),
          ),
        ),
        summary: Schema.optional(
          Schema.Struct({
            minimum_deadline: Schema.optional(
              Schema.Struct({
                status: Schema.Literals([
                  "currently_due",
                  "eventually_due",
                  "past_due",
                ]),
                time: Schema.optional(Schema.String),
              }),
            ),
          }),
        ),
      }),
    ),
  });
export type PostV2CoreAccountsIdCloseOutput =
  typeof PostV2CoreAccountsIdCloseOutput.Type;

// The operation
/**
 * Close an Account
 *
 * Removes access to the Account and its associated resources. Closed Accounts can no longer be operated on, but limited information can still be retrieved through the API in order to be able to track their history.
 *
 * @param id - The ID of the Account to close.
 */
export const PostV2CoreAccountsIdClose = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostV2CoreAccountsIdCloseInput,
    outputSchema: PostV2CoreAccountsIdCloseOutput,
  }),
);
