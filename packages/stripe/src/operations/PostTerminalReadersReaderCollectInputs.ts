import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTerminalReadersReaderCollectInputsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reader: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
    inputs: Schema.Array(
      Schema.Struct({
        custom_text: Schema.Struct({
          description: Schema.optional(Schema.String),
          skip_button: Schema.optional(Schema.String),
          submit_button: Schema.optional(Schema.String),
          title: Schema.String,
        }),
        required: Schema.optional(Schema.Boolean),
        selection: Schema.optional(
          Schema.Struct({
            choices: Schema.Array(
              Schema.Struct({
                id: Schema.String,
                style: Schema.optional(
                  Schema.Literals(["primary", "secondary"]),
                ),
                text: Schema.String,
              }),
            ),
          }),
        ),
        toggles: Schema.optional(
          Schema.Array(
            Schema.Struct({
              default_value: Schema.optional(
                Schema.Literals(["disabled", "enabled"]),
              ),
              description: Schema.optional(Schema.String),
              title: Schema.optional(Schema.String),
            }),
          ),
        ),
        type: Schema.Literals([
          "email",
          "numeric",
          "phone",
          "selection",
          "signature",
          "text",
        ]),
      }),
    ),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/terminal/readers/{reader}/collect_inputs",
      contentType: "form-urlencoded",
    }),
  );
export type PostTerminalReadersReaderCollectInputsInput =
  typeof PostTerminalReadersReaderCollectInputsInput.Type;

// Output Schema
export const PostTerminalReadersReaderCollectInputsOutput =
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
export type PostTerminalReadersReaderCollectInputsOutput =
  typeof PostTerminalReadersReaderCollectInputsOutput.Type;

// The operation
/**
 * Collect inputs using a Reader
 *
 * <p>Initiates an <a href="/docs/terminal/features/collect-inputs">input collection flow</a> on a Reader to display input forms and collect information from your customers.</p>
 */
export const PostTerminalReadersReaderCollectInputs =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostTerminalReadersReaderCollectInputsInput,
    outputSchema: PostTerminalReadersReaderCollectInputsOutput,
  }));
