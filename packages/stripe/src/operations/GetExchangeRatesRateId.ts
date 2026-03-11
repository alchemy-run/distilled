import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetExchangeRatesRateIdInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    rate_id: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/exchange_rates/{rate_id}",
      contentType: "form-urlencoded",
    }),
  );
export type GetExchangeRatesRateIdInput =
  typeof GetExchangeRatesRateIdInput.Type;

// Output Schema
export const GetExchangeRatesRateIdOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    id: Schema.String,
    object: Schema.Literals(["exchange_rate"]),
    rates: Schema.Record(Schema.String, Schema.Number),
  });
export type GetExchangeRatesRateIdOutput =
  typeof GetExchangeRatesRateIdOutput.Type;

// The operation
/**
 * Retrieve an exchange rate
 *
 * <p>[Deprecated] The <code>ExchangeRate</code> APIs are deprecated. Please use the <a href="https://docs.stripe.com/payments/currencies/localize-prices/fx-quotes-api">FX Quotes API</a> instead.</p>
 * <p>Retrieves the exchange rates from the given currency to every supported currency.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetExchangeRatesRateId = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetExchangeRatesRateIdInput,
    outputSchema: GetExchangeRatesRateIdOutput,
  }),
);
