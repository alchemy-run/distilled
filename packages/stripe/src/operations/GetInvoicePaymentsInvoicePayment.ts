import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetInvoicePaymentsInvoicePaymentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    invoice_payment: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/invoice_payments/{invoice_payment}",
      contentType: "form-urlencoded",
    }),
  );
export type GetInvoicePaymentsInvoicePaymentInput =
  typeof GetInvoicePaymentsInvoicePaymentInput.Type;

// Output Schema
export const GetInvoicePaymentsInvoicePaymentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type GetInvoicePaymentsInvoicePaymentOutput =
  typeof GetInvoicePaymentsInvoicePaymentOutput.Type;

// The operation
/**
 * Retrieve an InvoicePayment
 *
 * <p>Retrieves the invoice payment with the given ID.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetInvoicePaymentsInvoicePayment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetInvoicePaymentsInvoicePaymentInput,
    outputSchema: GetInvoicePaymentsInvoicePaymentOutput,
  }));
