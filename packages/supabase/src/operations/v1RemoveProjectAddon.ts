import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1RemoveProjectAddonInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    addon_variant: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/projects/{ref}/billing/addons/{addon_variant}",
    }),
  );
export type V1RemoveProjectAddonInput = typeof V1RemoveProjectAddonInput.Type;

// Output Schema
export const V1RemoveProjectAddonOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type V1RemoveProjectAddonOutput = typeof V1RemoveProjectAddonOutput.Type;

// The operation
/**
 * Remove billing addons or revert compute instance sizing
 *
 * Disables the selected addon variant, including rolling the compute instance back to its previous size.
 *
 * @param ref - Project ref
 */
export const v1RemoveProjectAddon = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1RemoveProjectAddonInput,
    outputSchema: V1RemoveProjectAddonOutput,
  }),
);
