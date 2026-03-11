import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostFileLinksLinkInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    link: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
    expires_at: Schema.optional(Schema.Unknown),
    metadata: Schema.optional(Schema.Unknown),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "/v1/file_links/{link}",
    contentType: "form-urlencoded",
  }),
);
export type PostFileLinksLinkInput = typeof PostFileLinksLinkInput.Type;

// Output Schema
export const PostFileLinksLinkOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.Number,
    expired: Schema.Boolean,
    expires_at: Schema.NullOr(Schema.Number),
    file: Schema.Unknown,
    id: Schema.String,
    livemode: Schema.Boolean,
    metadata: Schema.Record(Schema.String, Schema.String),
    object: Schema.Literals(["file_link"]),
    url: Schema.NullOr(Schema.String),
  });
export type PostFileLinksLinkOutput = typeof PostFileLinksLinkOutput.Type;

// The operation
/**
 * Update a file link
 *
 * <p>Updates an existing file link object. Expired links can no longer be updated.</p>
 */
export const PostFileLinksLink = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostFileLinksLinkInput,
  outputSchema: PostFileLinksLinkOutput,
}));
