import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostCustomersCustomerFundingInstructionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    customer: Schema.String.pipe(T.PathParam()),
    bank_transfer: Schema.Struct({
      eu_bank_transfer: Schema.optional(
        Schema.Struct({
          country: Schema.String,
        }),
      ),
      requested_address_types: Schema.optional(
        Schema.Array(Schema.Literals(["iban", "sort_code", "spei", "zengin"])),
      ),
      type: Schema.Literals([
        "eu_bank_transfer",
        "gb_bank_transfer",
        "jp_bank_transfer",
        "mx_bank_transfer",
        "us_bank_transfer",
      ]),
    }),
    currency: Schema.String,
    expand: Schema.optional(Schema.Array(Schema.String)),
    funding_type: Schema.Literals(["bank_transfer"]),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/customers/{customer}/funding_instructions",
      contentType: "form-urlencoded",
    }),
  );
export type PostCustomersCustomerFundingInstructionsInput =
  typeof PostCustomersCustomerFundingInstructionsInput.Type;

// Output Schema
export const PostCustomersCustomerFundingInstructionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    bank_transfer: Schema.Struct({
      country: Schema.String,
      financial_addresses: Schema.Array(
        Schema.Struct({
          aba: Schema.optional(
            Schema.Struct({
              account_holder_address: Schema.Struct({
                city: Schema.NullOr(Schema.String),
                country: Schema.NullOr(Schema.String),
                line1: Schema.NullOr(Schema.String),
                line2: Schema.NullOr(Schema.String),
                postal_code: Schema.NullOr(Schema.String),
                state: Schema.NullOr(Schema.String),
              }),
              account_holder_name: Schema.String,
              account_number: Schema.String,
              account_type: Schema.String,
              bank_address: Schema.Struct({
                city: Schema.NullOr(Schema.String),
                country: Schema.NullOr(Schema.String),
                line1: Schema.NullOr(Schema.String),
                line2: Schema.NullOr(Schema.String),
                postal_code: Schema.NullOr(Schema.String),
                state: Schema.NullOr(Schema.String),
              }),
              bank_name: Schema.String,
              routing_number: Schema.String,
            }),
          ),
          iban: Schema.optional(
            Schema.Struct({
              account_holder_address: Schema.Struct({
                city: Schema.NullOr(Schema.String),
                country: Schema.NullOr(Schema.String),
                line1: Schema.NullOr(Schema.String),
                line2: Schema.NullOr(Schema.String),
                postal_code: Schema.NullOr(Schema.String),
                state: Schema.NullOr(Schema.String),
              }),
              account_holder_name: Schema.String,
              bank_address: Schema.Struct({
                city: Schema.NullOr(Schema.String),
                country: Schema.NullOr(Schema.String),
                line1: Schema.NullOr(Schema.String),
                line2: Schema.NullOr(Schema.String),
                postal_code: Schema.NullOr(Schema.String),
                state: Schema.NullOr(Schema.String),
              }),
              bic: Schema.String,
              country: Schema.String,
              iban: Schema.String,
            }),
          ),
          sort_code: Schema.optional(
            Schema.Struct({
              account_holder_address: Schema.Struct({
                city: Schema.NullOr(Schema.String),
                country: Schema.NullOr(Schema.String),
                line1: Schema.NullOr(Schema.String),
                line2: Schema.NullOr(Schema.String),
                postal_code: Schema.NullOr(Schema.String),
                state: Schema.NullOr(Schema.String),
              }),
              account_holder_name: Schema.String,
              account_number: Schema.String,
              bank_address: Schema.Struct({
                city: Schema.NullOr(Schema.String),
                country: Schema.NullOr(Schema.String),
                line1: Schema.NullOr(Schema.String),
                line2: Schema.NullOr(Schema.String),
                postal_code: Schema.NullOr(Schema.String),
                state: Schema.NullOr(Schema.String),
              }),
              sort_code: Schema.String,
            }),
          ),
          spei: Schema.optional(
            Schema.Struct({
              account_holder_address: Schema.Struct({
                city: Schema.NullOr(Schema.String),
                country: Schema.NullOr(Schema.String),
                line1: Schema.NullOr(Schema.String),
                line2: Schema.NullOr(Schema.String),
                postal_code: Schema.NullOr(Schema.String),
                state: Schema.NullOr(Schema.String),
              }),
              account_holder_name: Schema.String,
              bank_address: Schema.Struct({
                city: Schema.NullOr(Schema.String),
                country: Schema.NullOr(Schema.String),
                line1: Schema.NullOr(Schema.String),
                line2: Schema.NullOr(Schema.String),
                postal_code: Schema.NullOr(Schema.String),
                state: Schema.NullOr(Schema.String),
              }),
              bank_code: Schema.String,
              bank_name: Schema.String,
              clabe: Schema.String,
            }),
          ),
          supported_networks: Schema.optional(
            Schema.Array(
              Schema.Literals([
                "ach",
                "bacs",
                "domestic_wire_us",
                "fps",
                "sepa",
                "spei",
                "swift",
                "zengin",
              ]),
            ),
          ),
          swift: Schema.optional(
            Schema.Struct({
              account_holder_address: Schema.Struct({
                city: Schema.NullOr(Schema.String),
                country: Schema.NullOr(Schema.String),
                line1: Schema.NullOr(Schema.String),
                line2: Schema.NullOr(Schema.String),
                postal_code: Schema.NullOr(Schema.String),
                state: Schema.NullOr(Schema.String),
              }),
              account_holder_name: Schema.String,
              account_number: Schema.String,
              account_type: Schema.String,
              bank_address: Schema.Struct({
                city: Schema.NullOr(Schema.String),
                country: Schema.NullOr(Schema.String),
                line1: Schema.NullOr(Schema.String),
                line2: Schema.NullOr(Schema.String),
                postal_code: Schema.NullOr(Schema.String),
                state: Schema.NullOr(Schema.String),
              }),
              bank_name: Schema.String,
              swift_code: Schema.String,
            }),
          ),
          type: Schema.Literals([
            "aba",
            "iban",
            "sort_code",
            "spei",
            "swift",
            "zengin",
          ]),
          zengin: Schema.optional(
            Schema.Struct({
              account_holder_address: Schema.Struct({
                city: Schema.NullOr(Schema.String),
                country: Schema.NullOr(Schema.String),
                line1: Schema.NullOr(Schema.String),
                line2: Schema.NullOr(Schema.String),
                postal_code: Schema.NullOr(Schema.String),
                state: Schema.NullOr(Schema.String),
              }),
              account_holder_name: Schema.NullOr(Schema.String),
              account_number: Schema.NullOr(Schema.String),
              account_type: Schema.NullOr(Schema.String),
              bank_address: Schema.Struct({
                city: Schema.NullOr(Schema.String),
                country: Schema.NullOr(Schema.String),
                line1: Schema.NullOr(Schema.String),
                line2: Schema.NullOr(Schema.String),
                postal_code: Schema.NullOr(Schema.String),
                state: Schema.NullOr(Schema.String),
              }),
              bank_code: Schema.NullOr(Schema.String),
              bank_name: Schema.NullOr(Schema.String),
              branch_code: Schema.NullOr(Schema.String),
              branch_name: Schema.NullOr(Schema.String),
            }),
          ),
        }),
      ),
      type: Schema.Literals(["eu_bank_transfer", "jp_bank_transfer"]),
    }),
    currency: Schema.String,
    funding_type: Schema.Literals(["bank_transfer"]),
    livemode: Schema.Boolean,
    object: Schema.Literals(["funding_instructions"]),
  });
export type PostCustomersCustomerFundingInstructionsOutput =
  typeof PostCustomersCustomerFundingInstructionsOutput.Type;

// The operation
/**
 * Create or retrieve funding instructions for a customer cash balance
 *
 * <p>Retrieve funding instructions for a customer cash balance. If funding instructions do not yet exist for the customer, new
 * funding instructions will be created. If funding instructions have already been created for a given customer, the same
 * funding instructions will be retrieved. In other words, we will return the same funding instructions each time.</p>
 */
export const PostCustomersCustomerFundingInstructions =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostCustomersCustomerFundingInstructionsInput,
    outputSchema: PostCustomersCustomerFundingInstructionsOutput,
  }));
