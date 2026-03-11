import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetBillingCreditGrantsIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/billing/credit_grants/{id}",
      contentType: "form-urlencoded",
    }),
  );
export type GetBillingCreditGrantsIdInput =
  typeof GetBillingCreditGrantsIdInput.Type;

// Output Schema
export const GetBillingCreditGrantsIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    amount: Schema.Struct({
      monetary: Schema.Unknown,
      type: Schema.Literals(["monetary"]),
    }),
    applicability_config: Schema.Struct({
      scope: Schema.Struct({
        price_type: Schema.optional(Schema.Literals(["metered"])),
        prices: Schema.optional(
          Schema.Array(
            Schema.Struct({
              id: Schema.NullOr(Schema.String),
            }),
          ),
        ),
      }),
    }),
    category: Schema.Literals(["paid", "promotional"]),
    created: Schema.Number,
    customer: Schema.Unknown,
    customer_account: Schema.NullOr(Schema.String),
    effective_at: Schema.NullOr(Schema.Number),
    expires_at: Schema.NullOr(Schema.Number),
    id: Schema.String,
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    name: Schema.NullOr(Schema.String),
    object: Schema.Literals(["billing.credit_grant"]),
    priority: Schema.optional(Schema.NullOr(Schema.Number)),
    test_clock: Schema.Unknown,
    updated: Schema.Number,
    voided_at: Schema.NullOr(Schema.Number),
  });
export type GetBillingCreditGrantsIdOutput =
  typeof GetBillingCreditGrantsIdOutput.Type;

// The operation
/**
 * Retrieve a credit grant
 *
 * <p>Retrieves a credit grant.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 * @param id - Unique identifier for the object.
 */
export const GetBillingCreditGrantsId = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetBillingCreditGrantsIdInput,
    outputSchema: GetBillingCreditGrantsIdOutput,
  }),
);
