import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTerminalReadersReaderRefundPaymentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reader: Schema.String.pipe(T.PathParam()),
    amount: Schema.optional(Schema.Number),
    charge: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    payment_intent: Schema.optional(Schema.String),
    refund_application_fee: Schema.optional(Schema.Boolean),
    refund_payment_config: Schema.optional(
      Schema.Struct({
        enable_customer_cancellation: Schema.optional(Schema.Boolean),
      }),
    ),
    reverse_transfer: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/terminal/readers/{reader}/refund_payment",
      contentType: "form-urlencoded",
    }),
  );
export type PostTerminalReadersReaderRefundPaymentInput =
  typeof PostTerminalReadersReaderRefundPaymentInput.Type;

// Output Schema
export const PostTerminalReadersReaderRefundPaymentOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    action: Schema.Unknown,
    device_sw_version: Schema.NullOr(Schema.String),
    device_type: Schema.Literals([
      "bbpos_chipper2x",
      "bbpos_wisepad3",
      "bbpos_wisepos_e",
      "mobile_phone_reader",
      "simulated_stripe_s700",
      "simulated_stripe_s710",
      "simulated_wisepos_e",
      "stripe_m2",
      "stripe_s700",
      "stripe_s710",
      "verifone_P400",
    ]),
    id: Schema.String,
    ip_address: Schema.NullOr(Schema.String),
    label: Schema.String,
    last_seen_at: Schema.NullOr(Schema.Number),
    livemode: Schema.Boolean,
    location: Schema.Unknown,
    metadata: Schema.Record(Schema.String, Schema.String),
    object: Schema.Literals(["terminal.reader"]),
    serial_number: Schema.String,
    status: Schema.NullOr(Schema.Literals(["offline", "online"])),
  });
export type PostTerminalReadersReaderRefundPaymentOutput =
  typeof PostTerminalReadersReaderRefundPaymentOutput.Type;

// The operation
/**
 * Refund a Charge or a PaymentIntent in-person
 *
 * <p>Initiates an in-person refund on a Reader. See <a href="/docs/terminal/payments/regional?integration-country=CA#refund-an-interac-payment">Refund an Interac Payment</a> for more details.</p>
 */
export const PostTerminalReadersReaderRefundPayment =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTerminalReadersReaderRefundPaymentInput,
    outputSchema: PostTerminalReadersReaderRefundPaymentOutput,
  }));
