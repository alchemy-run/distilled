import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTestHelpersTerminalReadersReaderPresentPaymentMethodInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reader: Schema.String.pipe(T.PathParam()),
    amount_tip: Schema.optional(Schema.Number),
    card: Schema.optional(
      Schema.Struct({
        cvc: Schema.optional(Schema.String),
        exp_month: Schema.Number,
        exp_year: Schema.Number,
        number: Schema.String,
      }),
    ),
    card_present: Schema.optional(
      Schema.Struct({
        number: Schema.optional(Schema.String),
      }),
    ),
    expand: Schema.optional(Schema.Array(Schema.String)),
    interac_present: Schema.optional(
      Schema.Struct({
        number: Schema.optional(Schema.String),
      }),
    ),
    type: Schema.optional(
      Schema.Literals(["card", "card_present", "interac_present"]),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/test_helpers/terminal/readers/{reader}/present_payment_method",
      contentType: "form-urlencoded",
    }),
  );
export type PostTestHelpersTerminalReadersReaderPresentPaymentMethodInput =
  typeof PostTestHelpersTerminalReadersReaderPresentPaymentMethodInput.Type;

// Output Schema
export const PostTestHelpersTerminalReadersReaderPresentPaymentMethodOutput =
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
export type PostTestHelpersTerminalReadersReaderPresentPaymentMethodOutput =
  typeof PostTestHelpersTerminalReadersReaderPresentPaymentMethodOutput.Type;

// The operation
/**
 * Simulate presenting a payment method
 *
 * <p>Presents a payment method on a simulated reader. Can be used to simulate accepting a payment, saving a card or refunding a transaction.</p>
 */
export const PostTestHelpersTerminalReadersReaderPresentPaymentMethod =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTestHelpersTerminalReadersReaderPresentPaymentMethodInput,
    outputSchema:
      PostTestHelpersTerminalReadersReaderPresentPaymentMethodOutput,
  }));
