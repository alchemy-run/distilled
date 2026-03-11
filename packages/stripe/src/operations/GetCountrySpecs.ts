import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetCountrySpecsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  ending_before: Schema.optional(Schema.String),
  expand: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  starting_after: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/country_specs",
    contentType: "form-urlencoded",
  }),
);
export type GetCountrySpecsInput = typeof GetCountrySpecsInput.Type;

// Output Schema
export const GetCountrySpecsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
      default_currency: Schema.String,
      id: Schema.String,
      object: Schema.Literals(["country_spec"]),
      supported_bank_account_currencies: Schema.Record(
        Schema.String,
        Schema.Array(Schema.String),
      ),
      supported_payment_currencies: Schema.Array(Schema.String),
      supported_payment_methods: Schema.Array(Schema.String),
      supported_transfer_countries: Schema.Array(Schema.String),
      verification_fields: Schema.Struct({
        company: Schema.Struct({
          additional: Schema.Array(Schema.String),
          minimum: Schema.Array(Schema.String),
        }),
        individual: Schema.Struct({
          additional: Schema.Array(Schema.String),
          minimum: Schema.Array(Schema.String),
        }),
      }),
    }),
  ),
  has_more: Schema.Boolean,
  object: Schema.Literals(["list"]),
  url: Schema.String,
});
export type GetCountrySpecsOutput = typeof GetCountrySpecsOutput.Type;

// The operation
/**
 * List Country Specs
 *
 * <p>Lists all Country Spec objects available in the API.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetCountrySpecs = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetCountrySpecsInput,
  outputSchema: GetCountrySpecsOutput,
}));
