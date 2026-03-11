import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetExchangeRatesInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ending_before: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  starting_after: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/exchange_rates",
    contentType: "form-urlencoded",
  }),
);
export type GetExchangeRatesInput = typeof GetExchangeRatesInput.Type;

// Output Schema
export const GetExchangeRatesOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    data: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        object: Schema.Literals(["exchange_rate"]),
        rates: Schema.Record(Schema.String, Schema.Number),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  },
);
export type GetExchangeRatesOutput = typeof GetExchangeRatesOutput.Type;

// The operation
/**
 * List all exchange rates
 *
 * <p>[Deprecated] The <code>ExchangeRate</code> APIs are deprecated. Please use the <a href="https://docs.stripe.com/payments/currencies/localize-prices/fx-quotes-api">FX Quotes API</a> instead.</p>
 * <p>Returns a list of objects that contain the rates at which foreign currencies are converted to one another. Only shows the currencies for which Stripe supports.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is the currency that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with the exchange rate for currency X your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and total number of supported payout currencies, and the default is the max.
 * @param starting_after - A cursor for use in pagination. `starting_after` is the currency that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with the exchange rate for currency X, your subsequent call can include `starting_after=X` in order to fetch the next page of the list.
 */
export const GetExchangeRates = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetExchangeRatesInput,
  outputSchema: GetExchangeRatesOutput,
}));
