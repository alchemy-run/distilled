import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetIssuingPhysicalBundlesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
    status: Schema.optional(Schema.Literals(["active", "inactive", "review"])),
    type: Schema.optional(Schema.Literals(["custom", "standard"])),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/issuing/physical_bundles",
      contentType: "form-urlencoded",
    }),
  );
export type GetIssuingPhysicalBundlesInput =
  typeof GetIssuingPhysicalBundlesInput.Type;

// Output Schema
export const GetIssuingPhysicalBundlesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        features: Schema.Struct({
          card_logo: Schema.Literals(["optional", "required", "unsupported"]),
          carrier_text: Schema.Literals([
            "optional",
            "required",
            "unsupported",
          ]),
          second_line: Schema.Literals(["optional", "required", "unsupported"]),
        }),
        id: Schema.String,
        livemode: Schema.Boolean,
        name: Schema.String,
        object: Schema.Literals(["issuing.physical_bundle"]),
        status: Schema.Literals(["active", "inactive", "review"]),
        type: Schema.Literals(["custom", "standard"]),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetIssuingPhysicalBundlesOutput =
  typeof GetIssuingPhysicalBundlesOutput.Type;

// The operation
/**
 * List all physical bundles
 *
 * <p>Returns a list of physical bundle objects. The objects are sorted in descending order by creation date, with the most recently created object appearing first.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 * @param status - Only return physical bundles with the given status.
 * @param type - Only return physical bundles with the given type.
 */
export const GetIssuingPhysicalBundles = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetIssuingPhysicalBundlesInput,
    outputSchema: GetIssuingPhysicalBundlesOutput,
  }),
);
