import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveString } from "../sensitive";

// Input Schema
export const PostTerminalConfigurationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    bbpos_wisepad3: Schema.optional(
      Schema.Struct({
        splashscreen: Schema.optional(Schema.Unknown),
      }),
    ),
    bbpos_wisepos_e: Schema.optional(
      Schema.Struct({
        splashscreen: Schema.optional(Schema.Unknown),
      }),
    ),
    cellular: Schema.optional(Schema.Unknown),
    expand: Schema.optional(Schema.Array(Schema.String)),
    name: Schema.optional(Schema.String),
    offline: Schema.optional(Schema.Unknown),
    reboot_window: Schema.optional(
      Schema.Struct({
        end_hour: Schema.Number,
        start_hour: Schema.Number,
      }),
    ),
    stripe_s700: Schema.optional(
      Schema.Struct({
        splashscreen: Schema.optional(Schema.Unknown),
      }),
    ),
    stripe_s710: Schema.optional(
      Schema.Struct({
        splashscreen: Schema.optional(Schema.Unknown),
      }),
    ),
    tipping: Schema.optional(Schema.Unknown),
    verifone_p400: Schema.optional(
      Schema.Struct({
        splashscreen: Schema.optional(Schema.Unknown),
      }),
    ),
    wifi: Schema.optional(Schema.Unknown),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/terminal/configurations",
      contentType: "form-urlencoded",
    }),
  );
export type PostTerminalConfigurationsInput =
  typeof PostTerminalConfigurationsInput.Type;

// Output Schema
export const PostTerminalConfigurationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    bbpos_wisepad3: Schema.optional(
      Schema.Struct({
        splashscreen: Schema.optional(Schema.Unknown),
      }),
    ),
    bbpos_wisepos_e: Schema.optional(
      Schema.Struct({
        splashscreen: Schema.optional(Schema.Unknown),
      }),
    ),
    cellular: Schema.optional(
      Schema.Struct({
        enabled: Schema.Boolean,
      }),
    ),
    id: Schema.String,
    is_account_default: Schema.NullOr(Schema.Boolean),
    livemode: Schema.Boolean,
    name: Schema.NullOr(Schema.String),
    object: Schema.Literals(["terminal.configuration"]),
    offline: Schema.optional(
      Schema.Struct({
        enabled: Schema.NullOr(Schema.Boolean),
      }),
    ),
    reboot_window: Schema.optional(
      Schema.Struct({
        end_hour: Schema.Number,
        start_hour: Schema.Number,
      }),
    ),
    stripe_s700: Schema.optional(
      Schema.Struct({
        splashscreen: Schema.optional(Schema.Unknown),
      }),
    ),
    stripe_s710: Schema.optional(
      Schema.Struct({
        splashscreen: Schema.optional(Schema.Unknown),
      }),
    ),
    tipping: Schema.optional(
      Schema.Struct({
        aed: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        aud: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        cad: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        chf: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        czk: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        dkk: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        eur: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        gbp: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        gip: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        hkd: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        huf: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        jpy: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        mxn: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        myr: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        nok: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        nzd: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        pln: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        ron: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        sek: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        sgd: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
        usd: Schema.optional(
          Schema.Struct({
            fixed_amounts: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            percentages: Schema.optional(
              Schema.NullOr(Schema.Array(Schema.Number)),
            ),
            smart_tip_threshold: Schema.optional(Schema.Number),
          }),
        ),
      }),
    ),
    verifone_p400: Schema.optional(
      Schema.Struct({
        splashscreen: Schema.optional(Schema.Unknown),
      }),
    ),
    wifi: Schema.optional(
      Schema.Struct({
        enterprise_eap_peap: Schema.optional(
          Schema.Struct({
            ca_certificate_file: Schema.optional(Schema.String),
            password: SensitiveString,
            ssid: Schema.String,
            username: Schema.String,
          }),
        ),
        enterprise_eap_tls: Schema.optional(
          Schema.Struct({
            ca_certificate_file: Schema.optional(Schema.String),
            client_certificate_file: Schema.String,
            private_key_file: Schema.String,
            private_key_file_password: Schema.optional(SensitiveString),
            ssid: Schema.String,
          }),
        ),
        personal_psk: Schema.optional(
          Schema.Struct({
            password: SensitiveString,
            ssid: Schema.String,
          }),
        ),
        type: Schema.Literals([
          "enterprise_eap_peap",
          "enterprise_eap_tls",
          "personal_psk",
        ]),
      }),
    ),
  });
export type PostTerminalConfigurationsOutput =
  typeof PostTerminalConfigurationsOutput.Type;

// The operation
/**
 * Create a Configuration
 *
 * <p>Creates a new <code>Configuration</code> object.</p>
 */
export const PostTerminalConfigurations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostTerminalConfigurationsInput,
    outputSchema: PostTerminalConfigurationsOutput,
  }),
);
