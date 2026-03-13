/**
 * Azure Applicationinsights API
 *
 * Generated from the Azure REST API specs.
 * DO NOT EDIT - regenerate with: bun run generate
 */
import * as Schema from "effect/Schema";
import { API } from "../client.ts";
import * as T from "../traits.ts";

// Input Schema
export const WorkbooksDeleteInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  subscriptionId: Schema.String.pipe(T.PathParam()),
  resourceGroupName: Schema.String.pipe(T.PathParam()),
  "api-version": Schema.String,
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Insights/workbooks/{resourceName}",
  }),
);
export type WorkbooksDeleteInput = typeof WorkbooksDeleteInput.Type;

// Output Schema
export const WorkbooksDeleteOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type WorkbooksDeleteOutput = typeof WorkbooksDeleteOutput.Type;

// The operation
/**
 * Delete a workbook.
 *
 * @param subscriptionId - The ID of the target subscription.
 * @param resourceGroupName - The name of the resource group. The name is case insensitive.
 * @param api-version - The API version to use for this operation.
 */
export const WorkbooksDelete = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: WorkbooksDeleteInput,
  outputSchema: WorkbooksDeleteOutput,
}));
