import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostFileLinksInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  expand: Schema.optional(Schema.Array(Schema.String)),
  expires_at: Schema.optional(Schema.Number),
  file: Schema.String,
  metadata: Schema.optional(Schema.Unknown),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/file_links",
    contentType: "form-urlencoded",
  }),
);
export type PostFileLinksInput = typeof PostFileLinksInput.Type;

// Output Schema
export const PostFileLinksOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type PostFileLinksOutput = typeof PostFileLinksOutput.Type;

// The operation
/**
 * Create a file link
 *
 * <p>Creates a new file link object.</p>
 */
export const PostFileLinks = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: PostFileLinksInput,
  outputSchema: PostFileLinksOutput,
}));
