import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetFileLinksLinkInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  link: Schema.String.pipe(T.PathParam()),
  expand: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/file_links/{link}",
    contentType: "form-urlencoded",
  }),
);
export type GetFileLinksLinkInput = typeof GetFileLinksLinkInput.Type;

// Output Schema
export const GetFileLinksLinkOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    created: Schema.Number,
    expired: Schema.Boolean,
    expires_at: Schema.NullOr(Schema.Number),
    file: Schema.Unknown,
    id: Schema.String,
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    object: Schema.Literals(["file_link"]),
    url: Schema.NullOr(Schema.String),
  },
);
export type GetFileLinksLinkOutput = typeof GetFileLinksLinkOutput.Type;

// The operation
/**
 * Retrieve a file link
 *
 * <p>Retrieves the file link with the given ID.</p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetFileLinksLink = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetFileLinksLinkInput,
  outputSchema: GetFileLinksLinkOutput,
}));
