import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetQuotesQuotePdfInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    quote: Schema.String.pipe(T.PathParam()),
    expand: Schema.optional(Schema.String),
  },
).pipe(
  T.Http({
    method: "GET",
    path: "/v1/quotes/{quote}/pdf",
    contentType: "form-urlencoded",
  }),
);
export type GetQuotesQuotePdfInput = typeof GetQuotesQuotePdfInput.Type;

// Output Schema
export const GetQuotesQuotePdfOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetQuotesQuotePdfOutput = typeof GetQuotesQuotePdfOutput.Type;

// The operation
/**
 * Download quote PDF
 *
 * <p>Download the PDF for a finalized quote. Explanation for special handling can be found <a href="https://docs.stripe.com/quotes/overview#quote_pdf">here</a></p>
 *
 * @param expand - Specifies which fields in the response should be expanded.
 */
export const GetQuotesQuotePdf = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetQuotesQuotePdfInput,
  outputSchema: GetQuotesQuotePdfOutput,
}));
