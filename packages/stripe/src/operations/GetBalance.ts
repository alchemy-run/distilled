import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetBalanceInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/balance",
    contentType: "form-urlencoded",
  }),
);
export type GetBalanceInput = typeof GetBalanceInput.Type;

// Output Schema
export const GetBalanceOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  available: Schema.Array(
    Schema.Struct({
      amount: Schema.Number,
      currency: Schema.String,
      source_types: Schema.optional(
        Schema.Struct({
          bank_account: Schema.optional(Schema.Number),
          card: Schema.optional(Schema.Number),
          fpx: Schema.optional(Schema.Number),
        }),
      ),
    }),
  ),
  connect_reserved: Schema.optional(
    Schema.Array(
      Schema.Struct({
        amount: Schema.Number,
        currency: Schema.String,
        source_types: Schema.optional(
          Schema.Struct({
            bank_account: Schema.optional(Schema.Number),
            card: Schema.optional(Schema.Number),
            fpx: Schema.optional(Schema.Number),
          }),
        ),
      }),
    ),
  ),
  instant_available: Schema.optional(
    Schema.Array(
      Schema.Struct({
        amount: Schema.Number,
        currency: Schema.String,
        net_available: Schema.optional(
          Schema.Array(
            Schema.Struct({
              amount: Schema.Number,
              destination: Schema.String,
              source_types: Schema.optional(
                Schema.Struct({
                  bank_account: Schema.optional(Schema.Number),
                  card: Schema.optional(Schema.Number),
                  fpx: Schema.optional(Schema.Number),
                }),
              ),
            }),
          ),
        ),
        source_types: Schema.optional(
          Schema.Struct({
            bank_account: Schema.optional(Schema.Number),
            card: Schema.optional(Schema.Number),
            fpx: Schema.optional(Schema.Number),
          }),
        ),
      }),
    ),
  ),
  issuing: Schema.optional(
    Schema.Struct({
      available: Schema.Array(
        Schema.Struct({
          amount: Schema.Number,
          currency: Schema.String,
          source_types: Schema.optional(
            Schema.Struct({
              bank_account: Schema.optional(Schema.Number),
              card: Schema.optional(Schema.Number),
              fpx: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    }),
  ),
  livemode: Schema.Boolean,
  object: Schema.Literals(["balance"]),
  pending: Schema.Array(
    Schema.Struct({
      amount: Schema.Number,
      currency: Schema.String,
      source_types: Schema.optional(
        Schema.Struct({
          bank_account: Schema.optional(Schema.Number),
          card: Schema.optional(Schema.Number),
          fpx: Schema.optional(Schema.Number),
        }),
      ),
    }),
  ),
  refund_and_dispute_prefunding: Schema.optional(
    Schema.Struct({
      available: Schema.Array(
        Schema.Struct({
          amount: Schema.Number,
          currency: Schema.String,
          source_types: Schema.optional(
            Schema.Struct({
              bank_account: Schema.optional(Schema.Number),
              card: Schema.optional(Schema.Number),
              fpx: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
      pending: Schema.Array(
        Schema.Struct({
          amount: Schema.Number,
          currency: Schema.String,
          source_types: Schema.optional(
            Schema.Struct({
              bank_account: Schema.optional(Schema.Number),
              card: Schema.optional(Schema.Number),
              fpx: Schema.optional(Schema.Number),
            }),
          ),
        }),
      ),
    }),
  ),
});
export type GetBalanceOutput = typeof GetBalanceOutput.Type;

// The operation
/**
 * Retrieve balance
 *
 * <p>Retrieves the current account balance, based on the authentication that was used to make the request.
 * For a sample request, see <a href="/docs/connect/account-balances#accounting-for-negative-balances">Accounting for negative balances</a>.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetBalance = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetBalanceInput,
  outputSchema: GetBalanceOutput,
}));
