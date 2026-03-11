import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetRadarValueListsValueListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value_list: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/radar/value_lists/{value_list}",
      contentType: "form-urlencoded",
    }),
  );
export type GetRadarValueListsValueListInput =
  typeof GetRadarValueListsValueListInput.Type;

// Output Schema
export const GetRadarValueListsValueListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    alias: Schema.String,
    created: Schema.Number,
    created_by: Schema.String,
    id: Schema.String,
    item_type: Schema.Literals([
      "card_bin",
      "card_fingerprint",
      "case_sensitive_string",
      "country",
      "customer_id",
      "email",
      "ip_address",
      "sepa_debit_fingerprint",
      "string",
      "us_bank_account_fingerprint",
    ]),
    list_items: Schema.Struct({
      data: Schema.Array(
        Schema.Struct({
          created: Schema.Number,
          created_by: Schema.String,
          id: Schema.String,
          livemode: Schema.Boolean,
          object: Schema.Literals(["radar.value_list_item"]),
          value: Schema.String,
          value_list: Schema.String,
        }),
      ),
      has_more: Schema.Boolean,
      object: Schema.Literals(["list"]),
      url: Schema.String,
    }),
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    name: Schema.String,
    object: Schema.Literals(["radar.value_list"]),
  });
export type GetRadarValueListsValueListOutput =
  typeof GetRadarValueListsValueListOutput.Type;

// The operation
/**
 * Retrieve a value list
 *
 * <p>Retrieves a <code>ValueList</code> object.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetRadarValueListsValueList = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetRadarValueListsValueListInput,
    outputSchema: GetRadarValueListsValueListOutput,
  }),
);
