import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostBalanceSettingsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    expand: Schema.optional(Schema.Array(Schema.String)),
    payments: Schema.optional(
      Schema.Struct({
        debit_negative_balances: Schema.optional(Schema.Boolean),
        payouts: Schema.optional(
          Schema.Struct({
            minimum_balance_by_currency: Schema.optional(Schema.Unknown),
            schedule: Schema.optional(
              Schema.Struct({
                interval: Schema.optional(
                  Schema.Literals(["daily", "manual", "monthly", "weekly"]),
                ),
                monthly_payout_days: Schema.optional(
                  Schema.Array(Schema.Number),
                ),
                weekly_payout_days: Schema.optional(
                  Schema.Array(
                    Schema.Literals([
                      "friday",
                      "monday",
                      "thursday",
                      "tuesday",
                      "wednesday",
                    ]),
                  ),
                ),
              }),
            ),
            statement_descriptor: Schema.optional(Schema.String),
          }),
        ),
        settlement_timing: Schema.optional(
          Schema.Struct({
            delay_days_override: Schema.optional(Schema.Unknown),
          }),
        ),
      }),
    ),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/balance_settings",
      contentType: "form-urlencoded",
    }),
  );
export type PostBalanceSettingsInput = typeof PostBalanceSettingsInput.Type;

// Output Schema
export const PostBalanceSettingsOutput =
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
export type PostBalanceSettingsOutput = typeof PostBalanceSettingsOutput.Type;

// The operation
/**
 * Update balance settings
 *
 * <p>Updates balance settings for a given connected account.
 * Related guide: <a href="/connect/authentication">Making API calls for connected accounts</a></p>
 */
export const PostBalanceSettings = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostBalanceSettingsInput,
  outputSchema: PostBalanceSettingsOutput,
}));
