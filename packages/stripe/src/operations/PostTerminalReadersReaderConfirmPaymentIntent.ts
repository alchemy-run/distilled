import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTerminalReadersReaderConfirmPaymentIntentInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reader: Schema.String.pipe(T.PathParam()),
    confirm_config: Schema.optional(
      Schema.Struct({
        return_url: Schema.optional(Schema.String),
      }),
    ),
    expand: Schema.optional(Schema.Array(Schema.String)),
    payment_intent: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/terminal/readers/{reader}/confirm_payment_intent",
      contentType: "form-urlencoded",
    }),
  );
export type PostTerminalReadersReaderConfirmPaymentIntentInput =
  typeof PostTerminalReadersReaderConfirmPaymentIntentInput.Type;

// Output Schema
export const PostTerminalReadersReaderConfirmPaymentIntentOutput =
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
export type PostTerminalReadersReaderConfirmPaymentIntentOutput =
  typeof PostTerminalReadersReaderConfirmPaymentIntentOutput.Type;

// The operation
/**
 * Confirm a PaymentIntent on the Reader
 *
 * <p>Finalizes a payment on a Reader. See <a href="/docs/terminal/payments/collect-card-payment?terminal-sdk-platform=server-driven&process=inspect#confirm-the-paymentintent">Confirming a Payment</a> for more details.</p>
 */
export const PostTerminalReadersReaderConfirmPaymentIntent =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTerminalReadersReaderConfirmPaymentIntentInput,
    outputSchema: PostTerminalReadersReaderConfirmPaymentIntentOutput,
  }));
