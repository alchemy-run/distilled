import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveString } from "../sensitive";

// Input Schema
export const V1UpdateDatabasePasswordInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    password: SensitiveString,
  }).pipe(
    T.Http({ method: "PATCH", path: "/v1/projects/{ref}/database/password" }),
  );
export type V1UpdateDatabasePasswordInput =
  typeof V1UpdateDatabasePasswordInput.Type;

// Output Schema
export const V1UpdateDatabasePasswordOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    message: Schema.String,
  });
export type V1UpdateDatabasePasswordOutput =
  typeof V1UpdateDatabasePasswordOutput.Type;

// The operation
/**
 * Updates the database password
 *
 * @param ref - Project ref
 */
export const v1UpdateDatabasePassword = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1UpdateDatabasePasswordInput,
    outputSchema: V1UpdateDatabasePasswordOutput,
  }),
);
