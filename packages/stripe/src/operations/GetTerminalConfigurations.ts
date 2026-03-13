import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveString } from "../sensitive";

// Input Schema
export const GetTerminalConfigurationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    is_account_default: Schema.optional(Schema.Boolean),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/terminal/configurations",
      contentType: "form-urlencoded",
    }),
  );
export type GetTerminalConfigurationsInput =
  typeof GetTerminalConfigurationsInput.Type;

// Output Schema
export const GetTerminalConfigurationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
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
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetTerminalConfigurationsOutput =
  typeof GetTerminalConfigurationsOutput.Type;

// The operation
/**
 * List all Configurations
 *
 * <p>Returns a list of <code>Configuration</code> objects.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param is_account_default - if present, only return the account default or non-default configurations.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetTerminalConfigurations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetTerminalConfigurationsInput,
    outputSchema: GetTerminalConfigurationsOutput,
  }),
);
