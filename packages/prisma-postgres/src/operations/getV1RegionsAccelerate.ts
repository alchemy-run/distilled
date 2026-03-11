import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1RegionsAccelerateInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({}).pipe(
    T.Http({ method: "GET", path: "/v1/regions/accelerate" }),
  );
export type GetV1RegionsAccelerateInput =
  typeof GetV1RegionsAccelerateInput.Type;

// Output Schema
export const GetV1RegionsAccelerateOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        type: Schema.String,
        name: Schema.String,
      }),
    ),
  });
export type GetV1RegionsAccelerateOutput =
  typeof GetV1RegionsAccelerateOutput.Type;

// The operation
/**
 * Get Prisma Accelerate regions
 *
 * Returns all available regions for Prisma Accelerate.
 */
export const getV1RegionsAccelerate = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetV1RegionsAccelerateInput,
    outputSchema: GetV1RegionsAccelerateOutput,
  }),
);
