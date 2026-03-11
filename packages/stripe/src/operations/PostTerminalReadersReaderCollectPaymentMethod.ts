import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTerminalReadersReaderCollectPaymentMethodInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reader: Schema.String.pipe(T.PathParam()),
    collect_config: Schema.optional(
      Schema.Struct({
        allow_redisplay: Schema.optional(
          Schema.Literals(["always", "limited", "unspecified"]),
        ),
        enable_customer_cancellation: Schema.optional(Schema.Boolean),
        skip_tipping: Schema.optional(Schema.Boolean),
        tipping: Schema.optional(
          Schema.Struct({
            amount_eligible: Schema.optional(Schema.Number),
          }),
        ),
      }),
    ),
    expand: Schema.optional(Schema.Array(Schema.String)),
    payment_intent: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/terminal/readers/{reader}/collect_payment_method",
      contentType: "form-urlencoded",
    }),
  );
export type PostTerminalReadersReaderCollectPaymentMethodInput =
  typeof PostTerminalReadersReaderCollectPaymentMethodInput.Type;

// Output Schema
export const PostTerminalReadersReaderCollectPaymentMethodOutput =
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
export type PostTerminalReadersReaderCollectPaymentMethodOutput =
  typeof PostTerminalReadersReaderCollectPaymentMethodOutput.Type;

// The operation
/**
 * Hand off a PaymentIntent to a Reader and collect card details
 *
 * <p>Initiates a payment flow on a Reader and updates the PaymentIntent with card details before manual confirmation. See <a href="/docs/terminal/payments/collect-card-payment?terminal-sdk-platform=server-driven&process=inspect#collect-a-paymentmethod">Collecting a Payment method</a> for more details.</p>
 */
export const PostTerminalReadersReaderCollectPaymentMethod =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTerminalReadersReaderCollectPaymentMethodInput,
    outputSchema: PostTerminalReadersReaderCollectPaymentMethodOutput,
  }));
