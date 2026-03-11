import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTreasuryFinancialAccountsFinancialAccountFeaturesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    financial_account: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/treasury/financial_accounts/{financial_account}/features",
      contentType: "form-urlencoded",
    }),
  );
export type GetTreasuryFinancialAccountsFinancialAccountFeaturesInput =
  typeof GetTreasuryFinancialAccountsFinancialAccountFeaturesInput.Type;

// Output Schema
export const GetTreasuryFinancialAccountsFinancialAccountFeaturesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
      }),
    ),
    inbound_transfers: Schema.optional(
      Schema.Struct({
        ach: Schema.optional(
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
        us_domestic_wire: Schema.optional(
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
      }),
    ),
    outbound_transfers: Schema.optional(
      Schema.Struct({
        ach: Schema.optional(
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
        us_domestic_wire: Schema.optional(
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
      }),
    ),
  });
export type GetTreasuryFinancialAccountsFinancialAccountFeaturesOutput =
  typeof GetTreasuryFinancialAccountsFinancialAccountFeaturesOutput.Type;

// The operation
/**
 * Retrieve FinancialAccount Features
 *
 * <p>Retrieves Features information associated with the FinancialAccount.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetTreasuryFinancialAccountsFinancialAccountFeatures =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetTreasuryFinancialAccountsFinancialAccountFeaturesInput,
    outputSchema: GetTreasuryFinancialAccountsFinancialAccountFeaturesOutput,
  }));
