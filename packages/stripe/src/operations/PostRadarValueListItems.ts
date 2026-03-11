import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostRadarValueListItemsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    expand: Schema.optional(Schema.Array(Schema.String)),
    value: Schema.String,
    value_list: Schema.String,
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/radar/value_list_items",
      contentType: "form-urlencoded",
    }),
  );
export type PostRadarValueListItemsInput =
  typeof PostRadarValueListItemsInput.Type;

// Output Schema
export const PostRadarValueListItemsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.Number,
    created_by: Schema.String,
    id: Schema.String,
    livemode: Schema.Boolean,
    object: Schema.Literals(["radar.value_list_item"]),
    value: Schema.String,
    value_list: Schema.String,
  });
export type PostRadarValueListItemsOutput =
  typeof PostRadarValueListItemsOutput.Type;

// The operation
/**
 * Create a value list item
 *
 * <p>Creates a new <code>ValueListItem</code> object, which is added to the specified parent value list.</p>
 */
export const PostRadarValueListItems = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostRadarValueListItemsInput,
    outputSchema: PostRadarValueListItemsOutput,
  }),
);
