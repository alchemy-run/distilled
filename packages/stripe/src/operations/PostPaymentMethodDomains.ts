import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostPaymentMethodDomainsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    domain_name: Schema.String,
    enabled: Schema.optional(Schema.Boolean),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/payment_method_domains",
      contentType: "form-urlencoded",
    }),
  );
export type PostPaymentMethodDomainsInput =
  typeof PostPaymentMethodDomainsInput.Type;

// Output Schema
export const PostPaymentMethodDomainsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type PostPaymentMethodDomainsOutput =
  typeof PostPaymentMethodDomainsOutput.Type;

// The operation
/**
 * Create a payment method domain
 *
 * <p>Creates a payment method domain.</p>
 */
export const PostPaymentMethodDomains = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostPaymentMethodDomainsInput,
    outputSchema: PostPaymentMethodDomainsOutput,
  }),
);
