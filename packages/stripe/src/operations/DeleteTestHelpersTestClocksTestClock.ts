import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteTestHelpersTestClocksTestClockInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    test_clock: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/test_helpers/test_clocks/{test_clock}",
      contentType: "form-urlencoded",
    }),
  );
export type DeleteTestHelpersTestClocksTestClockInput =
  typeof DeleteTestHelpersTestClocksTestClockInput.Type;

// Output Schema
export const DeleteTestHelpersTestClocksTestClockOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    deleted: Schema.Literals(["true"]),
    id: Schema.String,
    object: Schema.Literals(["test_helpers.test_clock"]),
  });
export type DeleteTestHelpersTestClocksTestClockOutput =
  typeof DeleteTestHelpersTestClocksTestClockOutput.Type;

// The operation
/**
 * Delete a test clock
 *
 * <p>Deletes a test clock.</p>
 */
export const DeleteTestHelpersTestClocksTestClock =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteTestHelpersTestClocksTestClockInput,
    outputSchema: DeleteTestHelpersTestClocksTestClockOutput,
  }));
