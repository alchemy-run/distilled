import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteRadarValueListsValueListInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    value_list: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/radar/value_lists/{value_list}",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteRadarValueListsValueListInput =
  typeof DeleteRadarValueListsValueListInput.Type;

// Output Schema
export const DeleteRadarValueListsValueListOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deleted: Schema.Literals(["true"]),
    id: Schema.String,
    object: Schema.Literals(["radar.value_list"]),
  });
export type DeleteRadarValueListsValueListOutput =
  typeof DeleteRadarValueListsValueListOutput.Type;

// The operation
/**
 * Delete a value list
 *
 * <p>Deletes a <code>ValueList</code> object, also deleting any items contained within the value list. To be deleted, a value list must not be referenced in any rules.</p>
 */
export const DeleteRadarValueListsValueList =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteRadarValueListsValueListInput,
    outputSchema: DeleteRadarValueListsValueListOutput,
  }));
