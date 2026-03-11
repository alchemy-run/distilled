import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteRadarValueListItemsItemInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    item: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/radar/value_list_items/{item}",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteRadarValueListItemsItemInput =
  typeof DeleteRadarValueListItemsItemInput.Type;

// Output Schema
export const DeleteRadarValueListItemsItemOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deleted: Schema.Literals(["true"]),
    id: Schema.String,
    object: Schema.Literals(["radar.value_list_item"]),
  });
export type DeleteRadarValueListItemsItemOutput =
  typeof DeleteRadarValueListItemsItemOutput.Type;

// The operation
/**
 * Delete a value list item
 *
 * <p>Deletes a <code>ValueListItem</code> object, removing it from its parent value list.</p>
 */
export const DeleteRadarValueListItemsItem =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteRadarValueListItemsItemInput,
    outputSchema: DeleteRadarValueListItemsItemOutput,
  }));
