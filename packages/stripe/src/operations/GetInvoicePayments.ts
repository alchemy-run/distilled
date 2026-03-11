import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetInvoicePaymentsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.optional(Schema.String),
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    invoice: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    payment: Schema.optional(Schema.String),
    starting_after: Schema.optional(Schema.String),
    status: Schema.optional(Schema.Literals(["canceled", "open", "paid"])),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/invoice_payments",
      contentType: "form-urlencoded",
    }),
  );
export type GetInvoicePaymentsInput = typeof GetInvoicePaymentsInput.Type;

// Output Schema
export const GetInvoicePaymentsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        amount_paid: Schema.NullOr(Schema.Number),
        amount_requested: Schema.Number,
        created: Schema.Number,
        currency: Schema.String,
        id: Schema.String,
        invoice: Schema.Unknown,
        is_default: Schema.Boolean,
        livemode: Schema.Boolean,
        object: Schema.Literals(["invoice_payment"]),
        payment: Schema.Struct({
          charge: Schema.optional(Schema.Unknown),
          payment_intent: Schema.optional(Schema.Unknown),
          payment_record: Schema.optional(Schema.Unknown),
          type: Schema.Literals(["charge", "payment_intent", "payment_record"]),
        }),
        status: Schema.String,
        status_transitions: Schema.Struct({
          canceled_at: Schema.NullOr(Schema.Number),
          paid_at: Schema.NullOr(Schema.Number),
        }),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetInvoicePaymentsOutput = typeof GetInvoicePaymentsOutput.Type;

// The operation
/**
 * List all payments for an invoice
 *
 * <p>When retrieving an invoice, there is an includable payments property containing the first handful of those items. There is also a URL where you can retrieve the full (paginated) list of payments.</p>
 *
 * @param created - Only return invoice payments that were created during the given date interval.
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param invoice - The identifier of the invoice whose payments to return.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param payment - The payment details of the invoice payments to return.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param status - The status of the invoice payments to return.
 */
export const GetInvoicePayments = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetInvoicePaymentsInput,
  outputSchema: GetInvoicePaymentsOutput,
}));
