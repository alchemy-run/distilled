import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetPaymentMethodDomainsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    domain_name: Schema.optional(Schema.String),
    enabled: Schema.optional(Schema.Boolean),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/payment_method_domains",
      contentType: "form-urlencoded",
    }),
  );
export type GetPaymentMethodDomainsInput =
  typeof GetPaymentMethodDomainsInput.Type;

// Output Schema
export const GetPaymentMethodDomainsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        amazon_pay: Schema.Struct({
          status: Schema.Literals(["active", "inactive"]),
          status_details: Schema.optional(
            Schema.Struct({
              error_message: Schema.String,
            }),
          ),
        }),
        apple_pay: Schema.Struct({
          status: Schema.Literals(["active", "inactive"]),
          status_details: Schema.optional(
            Schema.Struct({
              error_message: Schema.String,
            }),
          ),
        }),
        created: Schema.Number,
        domain_name: Schema.String,
        enabled: Schema.Boolean,
        google_pay: Schema.Struct({
          status: Schema.Literals(["active", "inactive"]),
          status_details: Schema.optional(
            Schema.Struct({
              error_message: Schema.String,
            }),
          ),
        }),
        id: Schema.String,
        klarna: Schema.Struct({
          status: Schema.Literals(["active", "inactive"]),
          status_details: Schema.optional(
            Schema.Struct({
              error_message: Schema.String,
            }),
          ),
        }),
        link: Schema.Struct({
          status: Schema.Literals(["active", "inactive"]),
          status_details: Schema.optional(
            Schema.Struct({
              error_message: Schema.String,
            }),
          ),
        }),
        livemode: Schema.Boolean,
        object: Schema.Literals(["payment_method_domain"]),
        paypal: Schema.Struct({
          status: Schema.Literals(["active", "inactive"]),
          status_details: Schema.optional(
            Schema.Struct({
              error_message: Schema.String,
            }),
          ),
        }),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetPaymentMethodDomainsOutput =
  typeof GetPaymentMethodDomainsOutput.Type;

// The operation
/**
 * List payment method domains
 *
 * <p>Lists the details of existing payment method domains.</p>
 *
 * @param domain_name - The domain name that this payment method domain object represents.
 * @param enabled - Whether this payment method domain is enabled. If the domain is not enabled, payment methods will not appear in Elements or Embedded Checkout
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetPaymentMethodDomains = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetPaymentMethodDomainsInput,
    outputSchema: GetPaymentMethodDomainsOutput,
  }),
);
