import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GenerateTypescriptTypesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    included_schemas: Schema.optional(Schema.String),
  }).pipe(
    T.Http({ method: "GET", path: "/v1/projects/{ref}/types/typescript" }),
  );
export type V1GenerateTypescriptTypesInput =
  typeof V1GenerateTypescriptTypesInput.Type;

// Output Schema
export const V1GenerateTypescriptTypesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    types: Schema.String,
  });
export type V1GenerateTypescriptTypesOutput =
  typeof V1GenerateTypescriptTypesOutput.Type;

// The operation
/**
 * Generate TypeScript types
 *
 * Returns the TypeScript types of your schema for use with supabase-js.
 *
 * @param ref - Project ref
 */
export const v1GenerateTypescriptTypes = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1GenerateTypescriptTypesInput,
    outputSchema: V1GenerateTypescriptTypesOutput,
  }),
);
