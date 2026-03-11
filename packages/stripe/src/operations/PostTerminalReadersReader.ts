import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostTerminalReadersReaderInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    reader: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
    label: Schema.optional(Schema.Unknown),
    metadata: Schema.optional(Schema.Unknown),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/terminal/readers/{reader}",
      contentType: "form-urlencoded",
    }),
  );
export type PostTerminalReadersReaderInput =
  typeof PostTerminalReadersReaderInput.Type;

// Output Schema
export const PostTerminalReadersReaderOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Unknown;
export type PostTerminalReadersReaderOutput =
  typeof PostTerminalReadersReaderOutput.Type;

// The operation
/**
 * Update a Reader
 *
 * <p>Updates a <code>Reader</code> object by setting the values of the parameters passed. Any parameters not provided will be left unchanged.</p>
 */
export const PostTerminalReadersReader = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: PostTerminalReadersReaderInput,
    outputSchema: PostTerminalReadersReaderOutput,
  }),
);
