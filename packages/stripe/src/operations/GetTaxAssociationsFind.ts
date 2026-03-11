import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTaxAssociationsFindInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    expand: Schema.optional(Schema.String),
    payment_intent: Schema.String,
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/tax/associations/find",
      contentType: "form-urlencoded",
    }),
  );
export type GetTaxAssociationsFindInput =
  typeof GetTaxAssociationsFindInput.Type;

// Output Schema
export const GetTaxAssociationsFindOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    calculation: Schema.String,
    id: Schema.String,
    object: Schema.Literals(["tax.association"]),
    payment_intent: Schema.String,
    tax_transaction_attempts: Schema.NullOr(
      Schema.Array(
        Schema.Struct({
          committed: Schema.optional(
            Schema.Struct({
              transaction: Schema.String,
            }),
          ),
          errored: Schema.optional(
            Schema.Struct({
              reason: Schema.Literals([
                "another_payment_associated_with_calculation",
                "calculation_expired",
                "currency_mismatch",
                "original_transaction_voided",
                "unique_reference_violation",
              ]),
            }),
          ),
          source: Schema.String,
          status: Schema.String,
        }),
      ),
    ),
  });
export type GetTaxAssociationsFindOutput =
  typeof GetTaxAssociationsFindOutput.Type;

// The operation
/**
 * Find a Tax Association
 *
 * <p>Finds a tax association object by PaymentIntent id.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 * @param payment_intent - Valid [PaymentIntent](https://docs.stripe.com/api/payment_intents/object) id
 */
export const GetTaxAssociationsFind = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetTaxAssociationsFindInput,
    outputSchema: GetTaxAssociationsFindOutput,
  }),
);
