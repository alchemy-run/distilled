import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTreasuryFinancialAccountsFinancialAccountFeaturesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    financial_account: Schema.String.pipe(T.PathParam()),
    card_issuing: Schema.optional(
      Schema.Struct({
        requested: Schema.Boolean,
      }),
    ),
    deposit_insurance: Schema.optional(
      Schema.Struct({
        requested: Schema.Boolean,
      }),
    ),
    expand: Schema.optional(Schema.Array(Schema.String)),
    financial_addresses: Schema.optional(
      Schema.Struct({
        aba: Schema.optional(
          Schema.Struct({
            requested: Schema.Boolean,
          }),
        ),
      }),
    ),
    inbound_transfers: Schema.optional(
      Schema.Struct({
        ach: Schema.optional(
          Schema.Struct({
            requested: Schema.Boolean,
          }),
        ),
      }),
    ),
    intra_stripe_flows: Schema.optional(
      Schema.Struct({
        requested: Schema.Boolean,
      }),
    ),
    outbound_payments: Schema.optional(
      Schema.Struct({
        ach: Schema.optional(
          Schema.Struct({
            requested: Schema.Boolean,
          }),
        ),
        us_domestic_wire: Schema.optional(
          Schema.Struct({
            requested: Schema.Boolean,
          }),
        ),
      }),
    ),
    outbound_transfers: Schema.optional(
      Schema.Struct({
        ach: Schema.optional(
          Schema.Struct({
            requested: Schema.Boolean,
          }),
        ),
        us_domestic_wire: Schema.optional(
          Schema.Struct({
            requested: Schema.Boolean,
          }),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/treasury/financial_accounts/{financial_account}/features",
      contentType: "form-urlencoded",
    }),
  );
export type PostTreasuryFinancialAccountsFinancialAccountFeaturesInput =
  typeof PostTreasuryFinancialAccountsFinancialAccountFeaturesInput.Type;

// Output Schema
export const PostTreasuryFinancialAccountsFinancialAccountFeaturesOutput =
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
export type PostTreasuryFinancialAccountsFinancialAccountFeaturesOutput =
  typeof PostTreasuryFinancialAccountsFinancialAccountFeaturesOutput.Type;

// The operation
/**
 * Update FinancialAccount Features
 *
 * <p>Updates the Features associated with a FinancialAccount.</p>
 */
export const PostTreasuryFinancialAccountsFinancialAccountFeatures =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTreasuryFinancialAccountsFinancialAccountFeaturesInput,
    outputSchema: PostTreasuryFinancialAccountsFinancialAccountFeaturesOutput,
  }));
