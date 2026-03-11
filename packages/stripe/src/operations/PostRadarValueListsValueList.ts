import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostRadarValueListsValueListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value_list: Schema.String.pipe(T.PathParam()),
    alias: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.Array(Schema.String)),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    name: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/radar/value_lists/{value_list}",
      contentType: "form-urlencoded",
    }),
  );
export type PostRadarValueListsValueListInput =
  typeof PostRadarValueListsValueListInput.Type;

// Output Schema
export const PostRadarValueListsValueListOutput =
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
export type PostRadarValueListsValueListOutput =
  typeof PostRadarValueListsValueListOutput.Type;

// The operation
/**
 * Update a value list
 *
 * <p>Updates a <code>ValueList</code> object by setting the values of the parameters passed. Any parameters not provided will be left unchanged. Note that <code>item_type</code> is immutable.</p>
 */
export const PostRadarValueListsValueList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostRadarValueListsValueListInput,
    outputSchema: PostRadarValueListsValueListOutput,
  }));
