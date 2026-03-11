import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetTerminalReadersReaderInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reader: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/terminal/readers/{reader}",
      contentType: "form-urlencoded",
    }),
  );
export type GetTerminalReadersReaderInput =
  typeof GetTerminalReadersReaderInput.Type;

// Output Schema
export const GetTerminalReadersReaderOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type GetTerminalReadersReaderOutput =
  typeof GetTerminalReadersReaderOutput.Type;

// The operation
/**
 * Retrieve a Reader
 *
 * <p>Retrieves a <code>Reader</code> object.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetTerminalReadersReader = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetTerminalReadersReaderInput,
    outputSchema: GetTerminalReadersReaderOutput,
  }),
);
