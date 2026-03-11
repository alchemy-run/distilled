import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PostInvoiceRenderingTemplatesTemplateUnarchiveInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    template: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.Array(Schema.String)),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/invoice_rendering_templates/{template}/unarchive",
      contentType: "form-urlencoded",
    }),
  );
export type PostInvoiceRenderingTemplatesTemplateUnarchiveInput =
  typeof PostInvoiceRenderingTemplatesTemplateUnarchiveInput.Type;

// Output Schema
export const PostInvoiceRenderingTemplatesTemplateUnarchiveOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    created: Schema.Number,
    id: Schema.String,
    livemode: Schema.Boolean,
    metadata: Schema.NullOr(Schema.Record(Schema.String, Schema.String)),
    nickname: Schema.NullOr(Schema.String),
    object: Schema.Literals(["invoice_rendering_template"]),
    status: Schema.Literals(["active", "archived"]),
    version: Schema.Number,
  });
export type PostInvoiceRenderingTemplatesTemplateUnarchiveOutput =
  typeof PostInvoiceRenderingTemplatesTemplateUnarchiveOutput.Type;

// The operation
/**
 * Unarchive an invoice rendering template
 *
 * <p>Unarchive an invoice rendering template so it can be used on new Stripe objects again.</p>
 */
export const PostInvoiceRenderingTemplatesTemplateUnarchive =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PostInvoiceRenderingTemplatesTemplateUnarchiveInput,
    outputSchema: PostInvoiceRenderingTemplatesTemplateUnarchiveOutput,
  }));
