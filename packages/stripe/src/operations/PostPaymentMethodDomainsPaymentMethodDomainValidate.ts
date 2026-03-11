import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostPaymentMethodDomainsPaymentMethodDomainValidateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    payment_method_domain: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/payment_method_domains/{payment_method_domain}/validate",
      contentType: "form-urlencoded",
    }),
  );
export type PostPaymentMethodDomainsPaymentMethodDomainValidateInput =
  typeof PostPaymentMethodDomainsPaymentMethodDomainValidateInput.Type;

// Output Schema
export const PostPaymentMethodDomainsPaymentMethodDomainValidateOutput =
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
export type PostPaymentMethodDomainsPaymentMethodDomainValidateOutput =
  typeof PostPaymentMethodDomainsPaymentMethodDomainValidateOutput.Type;

// The operation
/**
 * Validate an existing payment method domain
 *
 * <p>Some payment methods might require additional steps to register a domain. If the requirements weren’t satisfied when the domain was created, the payment method will be inactive on the domain.
 * The payment method doesn’t appear in Elements or Embedded Checkout for this domain until it is active.</p>
 * <p>To activate a payment method on an existing payment method domain, complete the required registration steps specific to the payment method, and then validate the payment method domain with this endpoint.</p>
 * <p>Related guides: <a href="/docs/payments/payment-methods/pmd-registration">Payment method domains</a>.</p>
 */
export const PostPaymentMethodDomainsPaymentMethodDomainValidate =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostPaymentMethodDomainsPaymentMethodDomainValidateInput,
    outputSchema: PostPaymentMethodDomainsPaymentMethodDomainValidateOutput,
  }));
