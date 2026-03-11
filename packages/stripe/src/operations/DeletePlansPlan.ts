import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeletePlansPlanInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  plan: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/v1/plans/{plan}",
    contentType: "form-urlencoded",
  }),
);
export type DeletePlansPlanInput = typeof DeletePlansPlanInput.Type;

// Output Schema
export const DeletePlansPlanOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  deleted: Schema.Literals(["true"]),
  id: Schema.String,
  object: Schema.Literals(["plan"]),
});
export type DeletePlansPlanOutput = typeof DeletePlansPlanOutput.Type;

// The operation
/**
 * Delete a plan
 *
 * <p>Deleting plans means new subscribers can’t be added. Existing subscribers aren’t affected.</p>
 */
export const DeletePlansPlan = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeletePlansPlanInput,
  outputSchema: DeletePlansPlanOutput,
}));
