import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTestHelpersTestClocksInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ending_before: Schema.optional(Schema.String),
    expand: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    starting_after: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/test_helpers/test_clocks",
      contentType: "form-urlencoded",
    }),
  );
export type GetTestHelpersTestClocksInput =
  typeof GetTestHelpersTestClocksInput.Type;

// Output Schema
export const GetTestHelpersTestClocksOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        created: Schema.Number,
        deletes_after: Schema.Number,
        frozen_time: Schema.Number,
        id: Schema.String,
        livemode: Schema.Boolean,
        name: Schema.NullOr(Schema.String),
        object: Schema.Literals(["test_helpers.test_clock"]),
        status: Schema.Literals(["advancing", "internal_failure", "ready"]),
        status_details: Schema.Struct({
          advancing: Schema.optional(
            Schema.Struct({
              target_frozen_time: Schema.Number,
            }),
          ),
        }),
      }),
    ),
    has_more: Schema.Boolean,
    object: Schema.Literals(["list"]),
    url: Schema.String,
  });
export type GetTestHelpersTestClocksOutput =
  typeof GetTestHelpersTestClocksOutput.Type;

// The operation
/**
 * List all test clocks
 *
 * <p>Returns a list of your test clocks.</p>
 *
 * @param ending_before - A cursor for use in pagination. `ending_before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with `obj_bar`, your subsequent call can include `ending_before=obj_bar` in order to fetch the previous page of the list.
 * @param expand - Specifies which fields in the response should be expanded.
 * @param limit - A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 10.
 * @param starting_after - A cursor for use in pagination. `starting_after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with `obj_foo`, your subsequent call can include `starting_after=obj_foo` in order to fetch the next page of the list.
 */
export const GetTestHelpersTestClocks = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetTestHelpersTestClocksInput,
    outputSchema: GetTestHelpersTestClocksOutput,
  }),
);
