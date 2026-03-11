import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetBalanceSettingsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/balance_settings",
      contentType: "form-urlencoded",
    }),
  );
export type GetBalanceSettingsInput = typeof GetBalanceSettingsInput.Type;

// Output Schema
export const GetBalanceSettingsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    object: Schema.Literals(["balance_settings"]),
    payments: Schema.Struct({
      debit_negative_balances: Schema.NullOr(Schema.Boolean),
      payouts: Schema.Unknown,
      settlement_timing: Schema.Struct({
        delay_days: Schema.Number,
        delay_days_override: Schema.optional(Schema.Number),
      }),
    }),
  });
export type GetBalanceSettingsOutput = typeof GetBalanceSettingsOutput.Type;

// The operation
/**
 * Retrieve balance settings
 *
 * <p>Retrieves balance settings for a given connected account.
 * Related guide: <a href="/connect/authentication">Making API calls for connected accounts</a></p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetBalanceSettings = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetBalanceSettingsInput,
  outputSchema: GetBalanceSettingsOutput,
}));
