import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTreasuryFinancialAccountsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.optional(Schema.String),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
    status: Schema.optional(Schema.Literals(["closed", "open"])),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/treasury/financial_accounts",
      contentType: "form-urlencoded",
    }),
  );
export type GetTreasuryFinancialAccountsInput =
  typeof GetTreasuryFinancialAccountsInput.Type;

// Output Schema
export const GetTreasuryFinancialAccountsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        active_features: Schema.optional(
          Schema.Array(
            Schema.Literals([
              "card_issuing",
              "deposit_insurance",
              "financial_addresses.aba",
              "financial_addresses.aba.forwarding",
              "inbound_transfers.ach",
              "intra_stripe_flows",
              "outbound_payments.ach",
              "outbound_payments.us_domestic_wire",
              "outbound_transfers.ach",
              "outbound_transfers.us_domestic_wire",
              "remote_deposit_capture",
            ]),
          ),
        ),
        balance: Schema.Struct({
          cash: Schema.Record(Schema.String, Schema.Number),
          inbound_pending: Schema.Record(Schema.String, Schema.Number),
          outbound_pending: Schema.Record(Schema.String, Schema.Number),
        }),
        country: Schema.String,
        created: Schema.Number,
        features: Schema.optional(
          Schema.Struct({
            card_issuing: Schema.optional(
              Schema.Struct({
                requested: Schema.Boolean,
                status: Schema.Literals(["active", "pending", "restricted"]),
                status_details: Schema.Array(
                  Schema.Struct({
                    code: Schema.Literals([
                      "activating",
                      "capability_not_requested",
                      "financial_account_closed",
                      "rejected_other",
                      "rejected_unsupported_business",
                      "requirements_past_due",
                      "requirements_pending_verification",
                      "restricted_by_platform",
                      "restricted_other",
                    ]),
                    resolution: Schema.NullOr(
                      Schema.Literals([
                        "contact_stripe",
                        "provide_information",
                        "remove_restriction",
                      ]),
                    ),
                    restriction: Schema.optional(
                      Schema.Literals(["inbound_flows", "outbound_flows"]),
                    ),
                  }),
                ),
              }),
            ),
            deposit_insurance: Schema.optional(
              Schema.Struct({
                requested: Schema.Boolean,
                status: Schema.Literals(["active", "pending", "restricted"]),
                status_details: Schema.Array(
                  Schema.Struct({
                    code: Schema.Literals([
                      "activating",
                      "capability_not_requested",
                      "financial_account_closed",
                      "rejected_other",
                      "rejected_unsupported_business",
                      "requirements_past_due",
                      "requirements_pending_verification",
                      "restricted_by_platform",
                      "restricted_other",
                    ]),
                    resolution: Schema.NullOr(
                      Schema.Literals([
                        "contact_stripe",
                        "provide_information",
                        "remove_restriction",
                      ]),
                    ),
                    restriction: Schema.optional(
                      Schema.Literals(["inbound_flows", "outbound_flows"]),
                    ),
                  }),
                ),
              }),
            ),
            financial_addresses: Schema.optional(
              Schema.Struct({
                aba: Schema.optional(
                  Schema.Struct({
                    requested: Schema.Boolean,
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "activating",
                          "capability_not_requested",
                          "financial_account_closed",
                          "rejected_other",
                          "rejected_unsupported_business",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_by_platform",
                          "restricted_other",
                        ]),
                        resolution: Schema.NullOr(
                          Schema.Literals([
                            "contact_stripe",
                            "provide_information",
                            "remove_restriction",
                          ]),
                        ),
                        restriction: Schema.optional(
                          Schema.Literals(["inbound_flows", "outbound_flows"]),
                        ),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            inbound_transfers: Schema.optional(
              Schema.Struct({
                ach: Schema.optional(
                  Schema.Struct({
                    requested: Schema.Boolean,
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "activating",
                          "capability_not_requested",
                          "financial_account_closed",
                          "rejected_other",
                          "rejected_unsupported_business",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_by_platform",
                          "restricted_other",
                        ]),
                        resolution: Schema.NullOr(
                          Schema.Literals([
                            "contact_stripe",
                            "provide_information",
                            "remove_restriction",
                          ]),
                        ),
                        restriction: Schema.optional(
                          Schema.Literals(["inbound_flows", "outbound_flows"]),
                        ),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            intra_stripe_flows: Schema.optional(
              Schema.Struct({
                requested: Schema.Boolean,
                status: Schema.Literals(["active", "pending", "restricted"]),
                status_details: Schema.Array(
                  Schema.Struct({
                    code: Schema.Literals([
                      "activating",
                      "capability_not_requested",
                      "financial_account_closed",
                      "rejected_other",
                      "rejected_unsupported_business",
                      "requirements_past_due",
                      "requirements_pending_verification",
                      "restricted_by_platform",
                      "restricted_other",
                    ]),
                    resolution: Schema.NullOr(
                      Schema.Literals([
                        "contact_stripe",
                        "provide_information",
                        "remove_restriction",
                      ]),
                    ),
                    restriction: Schema.optional(
                      Schema.Literals(["inbound_flows", "outbound_flows"]),
                    ),
                  }),
                ),
              }),
            ),
            object: Schema.Literals(["treasury.financial_account_features"]),
            outbound_payments: Schema.optional(
              Schema.Struct({
                ach: Schema.optional(
                  Schema.Struct({
                    requested: Schema.Boolean,
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "activating",
                          "capability_not_requested",
                          "financial_account_closed",
                          "rejected_other",
                          "rejected_unsupported_business",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_by_platform",
                          "restricted_other",
                        ]),
                        resolution: Schema.NullOr(
                          Schema.Literals([
                            "contact_stripe",
                            "provide_information",
                            "remove_restriction",
                          ]),
                        ),
                        restriction: Schema.optional(
                          Schema.Literals(["inbound_flows", "outbound_flows"]),
                        ),
                      }),
                    ),
                  }),
                ),
                us_domestic_wire: Schema.optional(
                  Schema.Struct({
                    requested: Schema.Boolean,
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "activating",
                          "capability_not_requested",
                          "financial_account_closed",
                          "rejected_other",
                          "rejected_unsupported_business",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_by_platform",
                          "restricted_other",
                        ]),
                        resolution: Schema.NullOr(
                          Schema.Literals([
                            "contact_stripe",
                            "provide_information",
                            "remove_restriction",
                          ]),
                        ),
                        restriction: Schema.optional(
                          Schema.Literals(["inbound_flows", "outbound_flows"]),
                        ),
                      }),
                    ),
                  }),
                ),
              }),
            ),
            outbound_transfers: Schema.optional(
              Schema.Struct({
                ach: Schema.optional(
                  Schema.Struct({
                    requested: Schema.Boolean,
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "activating",
                          "capability_not_requested",
                          "financial_account_closed",
                          "rejected_other",
                          "rejected_unsupported_business",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_by_platform",
                          "restricted_other",
                        ]),
                        resolution: Schema.NullOr(
                          Schema.Literals([
                            "contact_stripe",
                            "provide_information",
                            "remove_restriction",
                          ]),
                        ),
                        restriction: Schema.optional(
                          Schema.Literals(["inbound_flows", "outbound_flows"]),
                        ),
                      }),
                    ),
                  }),
                ),
                us_domestic_wire: Schema.optional(
                  Schema.Struct({
                    requested: Schema.Boolean,
                    status: Schema.Literals([
                      "active",
                      "pending",
                      "restricted",
                    ]),
                    status_details: Schema.Array(
                      Schema.Struct({
                        code: Schema.Literals([
                          "activating",
                          "capability_not_requested",
                          "financial_account_closed",
                          "rejected_other",
                          "rejected_unsupported_business",
                          "requirements_past_due",
                          "requirements_pending_verification",
                          "restricted_by_platform",
                          "restricted_other",
                        ]),
                        resolution: Schema.NullOr(
                          Schema.Literals([
                            "contact_stripe",
                            "provide_information",
                            "remove_restriction",
                          ]),
                        ),
                        restriction: Schema.optional(
                          Schema.Literals(["inbound_flows", "outbound_flows"]),
                        ),
                      }),
                    ),
                  }),
                ),
              }),
            ),
          }),
        ),
        financial_addresses: Schema.Array(
          Schema.Struct({
            aba: Schema.optional(
              Schema.Struct({
                account_holder_name: Schema.String,
                account_number: Schema.optional(Schema.NullOr(Schema.String)),
                account_number_last4: Schema.String,
                bank_name: Schema.String,
                routing_number: Schema.String,
              }),
            ),
            supported_networks: Schema.optional(
              Schema.Array(Schema.Literals(["ach", "us_domestic_wire"])),
            ),
            type: Schema.Literals(["aba"]),
          }),
        ),
        id: Schema.String,
        is_default: Schema.optional(Schema.Boolean),
        livemode: Schema.Boolean,
        metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
        nickname: Schema.optional(Schema.NullOr(Schema.String)),
        object: Schema.Literals(["treasury.financial_account"]),
        pending_features: Schema.optional(
          Schema.Array(
            Schema.Literals([
              "card_issuing",
              "deposit_insurance",
              "financial_addresses.aba",
              "financial_addresses.aba.forwarding",
              "inbound_transfers.ach",
              "intra_stripe_flows",
              "outbound_payments.ach",
              "outbound_payments.us_domestic_wire",
              "outbound_transfers.ach",
              "outbound_transfers.us_domestic_wire",
              "remote_deposit_capture",
            ]),
          ),
        ),
        platform_restrictions: Schema.optional(Schema.Unknown),
        restricted_features: Schema.optional(
          Schema.Array(
            Schema.Literals([
              "card_issuing",
              "deposit_insurance",
              "financial_addresses.aba",
              "financial_addresses.aba.forwarding",
              "inbound_transfers.ach",
              "intra_stripe_flows",
              "outbound_payments.ach",
              "outbound_payments.us_domestic_wire",
              "outbound_transfers.ach",
              "outbound_transfers.us_domestic_wire",
              "remote_deposit_capture",
            ]),
          ),
        ),
        status: Schema.Literals(["closed", "open"]),
        status_details: Schema.Struct({
          closed: Schema.Unknown,
        }),
        supported_currencies: Schema.Array(Schema.String),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetTreasuryFinancialAccountsOutput =
  typeof GetTreasuryFinancialAccountsOutput.Type;

// The operation
/**
 * List all FinancialAccounts
 *
 * <p>Returns a list of FinancialAccounts.</p>
 *
 * @param created - Only return FinancialAccounts that were created during the given date interval.
 * @param ending_before - An object ID cursor for use in pagination.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit ranging from 1 to 100 (defaults to 10).
 * @param starting_after - An object ID cursor for use in pagination.
 * @param status - Only return FinancialAccounts that have the given status: `open` or `closed`
 */
export const GetTreasuryFinancialAccounts =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetTreasuryFinancialAccountsInput,
    outputSchema: GetTreasuryFinancialAccountsOutput,
  }));
